export function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const dataEl = document.getElementById('search-index-data');
  if (!dataEl) return;
  const posts = JSON.parse(dataEl.textContent || '[]');

  const filterToggle = document.getElementById('filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  const filterLabel = document.getElementById('filter-label');
  const resultsInfo = document.getElementById('results-info');

  const activeTags = new Set();
  let activeYear = '';

  // Populate year chips from post data
  const years = [...new Set(posts.map((p) => p.publishedAt.slice(0, 4)))].sort().reverse();
  const yearContainer = document.getElementById('year-filters');
  if (yearContainer) {
    // Keep the "All" button, append year buttons
    years.forEach((y) => {
      const btn = document.createElement('button');
      btn.dataset.year = y;
      btn.className = 'year-chip text-[11px] font-medium px-2 py-0.5 rounded-full text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-150 cursor-pointer border-none';
      btn.textContent = y;
      yearContainer.appendChild(btn);
    });
  }

  // Filter toggle (inline variant)
  let filterOpen = false;
  filterToggle?.addEventListener('click', () => {
    filterOpen = !filterOpen;
    filterPanel?.classList.toggle('hidden', !filterOpen);
    if (filterLabel) filterLabel.textContent = filterOpen ? '筛选 ▲' : '筛选';
  });

  // Tag chips
  document.querySelectorAll('#search-root .tag-chip').forEach((chip) => {
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

  // Year chips
  document.querySelectorAll('#search-root .year-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const y = chip.dataset.year || '';
      activeYear = y;
      document.querySelectorAll('#search-root .year-chip').forEach((c) => {
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
        match = post.tags.some((t) => activeTags.has(t));
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
          ? '未找到匹配文章。'
          : `${visible} 篇文章`;
      }
    }
  }
}
