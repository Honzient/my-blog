// Instance-safe search initializer.
// Each search widget renders a unique root id and calls initSearch(rootId),
// so inline + sidebar variants can coexist without duplicate-id collisions.
export function initSearch(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const input = root.querySelector('#search-input');
  const dataEl = document.getElementById('search-index-data');
  if (!input || !dataEl) return;

  const posts = JSON.parse(dataEl.textContent || '[]');

  const filterToggle = root.querySelector('#filter-toggle');
  const filterPanel = root.querySelector('#filter-panel');
  const filterLabel = root.querySelector('#filter-label');
  const resultsInfo = root.querySelector('#results-info');
  const yearContainer = root.querySelector('#year-filters');

  const activeTags = new Set();
  let activeYear = '';

  // Detect locale from the <html lang> attribute
  const htmlLang = document.documentElement.lang || 'zh';
  const t = {
    filters: htmlLang.startsWith('en') ? 'Filters' : '筛选',
    filtersOpen: htmlLang.startsWith('en') ? 'Filters ▲' : '筛选 ▲',
    noResults: htmlLang.startsWith('en') ? 'No posts found.' : '未找到匹配文章。',
    postsFound: (n) => htmlLang.startsWith('en') ? `${n} post(s)` : `${n} 篇文章`,
  };

  // Populate year chips from post data (skip the static "All" chip)
  const years = [...new Set(posts.map((p) => p.publishedAt.slice(0, 4)))].sort().reverse();
  if (yearContainer) {
    years.forEach((y) => {
      const btn = document.createElement('button');
      btn.dataset.year = y;
      btn.className = 'year-chip text-[11px] font-medium px-2 py-0.5 rounded-full text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-150 cursor-pointer border-none';
      btn.textContent = y;
      yearContainer.appendChild(btn);
    });
  }

  // Filter toggle (inline variant)
  let filterOpen = false;
  filterToggle?.addEventListener('click', () => {
    filterOpen = !filterOpen;
    filterPanel?.classList.toggle('hidden', !filterOpen);
    if (filterLabel) filterLabel.textContent = filterOpen ? t.filtersOpen : t.filters;
  });

  // Tag chips — scoped to this widget
  root.querySelectorAll('.tag-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const tag = chip.dataset.tag;
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
        chip.classList.remove('!bg-neutral-900', '!text-white', 'dark:!bg-neutral-300', 'dark:!text-neutral-900');
      } else {
        activeTags.add(tag);
        chip.classList.add('!bg-neutral-900', '!text-white', 'dark:!bg-neutral-300', 'dark:!text-neutral-900');
      }
      filterPosts();
    });
  });

  // Year chips — scoped to this widget
  root.querySelectorAll('.year-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const y = chip.dataset.year || '';
      activeYear = y;
      root.querySelectorAll('.year-chip').forEach((c) => {
        c.classList.remove('!bg-neutral-900', '!text-white', 'dark:!bg-neutral-300', 'dark:!text-neutral-900');
      });
      chip.classList.add('!bg-neutral-900', '!text-white', 'dark:!bg-neutral-300', 'dark:!text-neutral-900');
      filterPosts();
    });
  });

  // Input
  input.addEventListener('input', filterPosts);

  function filterPosts() {
    const query = input.value.trim().toLowerCase();
    const words = query ? query.split(/\s+/).filter(Boolean) : [];

    let visible = 0;
    document.querySelectorAll('.post-card').forEach((card) => {
      const id = card.dataset.postId;
      const post = posts.find((p) => p.id === id);
      if (!post) { card.style.display = ''; return; }

      let match = true;
      if (words.length > 0) {
        const haystack = `${post.title} ${post.description} ${post.tags.join(' ')} ${post.content}`.toLowerCase();
        match = words.every((w) => haystack.includes(w));
      }
      if (match && activeTags.size > 0) {
        match = post.tags.some((tag) => activeTags.has(tag));
      }
      if (match && activeYear) {
        match = post.publishedAt.slice(0, 4) === activeYear;
      }
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (resultsInfo) {
      const hasFilters = query || activeTags.size > 0 || activeYear;
      resultsInfo.classList.toggle('hidden', !hasFilters);
      if (hasFilters) {
        resultsInfo.textContent = visible === 0
          ? t.noResults
          : t.postsFound(visible);
      }
    }
  }
}