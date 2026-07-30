---
title: "重构的快乐：把一座山变成一叠纸"
description: "重构不是技术债的惩罚，而是程序员最接近「工匠精神」的时刻。聊聊我如何从恐惧重构到享受这个持续改进的过程。"
publishedAt: 2026-04-10
tags:
  - writing
  - tech
draft: false
---

刚入行的时候，我对「重构」的认知很简单：**代码坏了，需要修。**

过了几年才发现，重构不是修修补补，而是一种持续的、有纪律的改进过程。Martin Fowler 在二十年前就给重构下过定义：**在不改变外部行为的前提下，改善代码的内部结构。**

## 我看到的山

去年接手了一个遗留模块，三个文件，总共两千多行。一个函数平均 80 行，最长的 200 行。if-else 嵌套五层，没有人知道为什么有些变量叫 `data` 有些叫 `d`。

### 这不是代码，这是考古学

```js
// 原代码片段（已脱敏）
function process(d, t, opts) {
  if (d && d.length) {
    for (var i = 0; i < d.length; i++) {
      var item = d[i];
      if (item.status === 1) {
        if (t === 'A') {
          // 30 行处理逻辑
        } else if (t === 'B') {
          if (opts && opts.x) {
            // 20 行
          } else {
            // 15 行
          }
        }
      } else if (item.status === 2) {
        // 又是 40 行
      }
    }
  }
  return d;
}
```

这种代码的问题是：**你不敢改它。** 不是因为逻辑复杂，而是因为不知道改了之后哪里会炸。

## 第一步：给变量起名字

重构不是一蹴而就的。我的第一步永远是：**重命名。**

```js
// Step 1: 重命名
function processOrders(
  orders,
  orderType,
  options
) {
  if (!orders || !orders.length) return orders;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    if (order.status === STATUS.ACTIVE) {
      if (orderType === 'ARCHIVE') {
        handleArchiveOrder(order);
      } else if (orderType === 'EXPORT') {
        handleExportOrder(order, options);
      }
    } else if (order.status === STATUS.COMPLETED) {
      handleCompletedOrder(order, options);
    }
  }

  return orders;
}
```

只是改了名字，代码的可读性已经翻了一倍。这就是命名的重要性——**最便宜的重构，最立竿见影的效果。**

## 第二步：提取函数

```js
function processOrders(orders, orderType, options) {
  if (!orders?.length) return orders;

  return orders.map((order) => {
    switch (order.status) {
      case STATUS.ACTIVE:
        return processActiveOrder(order, orderType, options);
      case STATUS.COMPLETED:
        return processCompletedOrder(order, options);
      default:
        return order;
    }
  });
}

function processActiveOrder(order, type, options) {
  switch (type) {
    case 'ARCHIVE': return archiveOrder(order);
    case 'EXPORT': return exportOrder(order, options);
    default: return order;
  }
}

function processCompletedOrder(order, options) {
  return options?.includeCompleted
    ? formatCompletedOrder(order)
    : order;
}
```

两百行的函数变成了三个平均 15 行的函数。每个函数只做一件事，而且函数名告诉了你它在做什么。

## 第三步：引入类型

```ts
type OrderStatus = 'active' | 'completed' | 'cancelled';
type OrderType = 'archive' | 'export' | 'default';

interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
}

interface ProcessOptions {
  includeCompleted?: boolean;
  exportFormat?: 'csv' | 'json';
}

function processOrders(
  orders: Order[],
  orderType: OrderType,
  options: ProcessOptions = {}
): Order[] {
  if (!orders.length) return orders;

  return orders.map((order) =>
    processOrder(order, orderType, options)
  );
}
```

现在，当你把 `orderType` 写成 `'archiev'`（拼写错误）时，TypeScript 会直接在编辑器里告诉你正确的拼写是 `'archive'`。你不再需要「猜」一个参数可以是什么值——类型系统替你记住了。

## 重构的心理转变

最初我恐惧重构，是因为把它看成**惩罚**——「之前的人写得烂，现在我来擦屁股。」

后来我享受重构，是因为把它看成**工匠精神**——每一刀切下去，代码都变得更干净一点。就像木匠把粗糙的木材打磨成光滑的家具，每一次 `Extract Method`、每一次 `Rename Variable`，都是在把「能用」的代码打磨成「好读」的代码。

### 重构的安全网

**没有测试的重构是赌博，有测试的重构是手术。**

```ts
// vitest 测试示例
import { describe, it, expect } from 'vitest';
import { processOrders } from './processOrders';

describe('processOrders', () => {
  it('空数组直接返回', () => {
    expect(processOrders([], 'archive')).toEqual([]);
  });

  it('归档活跃订单', () => {
    const orders = [
      { id: '1', status: 'active', items: [] },
    ];
    const result = processOrders(orders, 'archive');
    expect(result[0].status).toBe('archived');
  });

  it('无效的操作类型返回原订单', () => {
    const orders = [
      { id: '1', status: 'active', items: [] },
    ];
    // @ts-expect-error 测试运行时类型错误
    const result = processOrders(orders, 'invalid');
    expect(result[0]).toEqual(orders[0]);
  });
});
```

## 结论

重构不是一次性的壮举，而是一种**持续的关注**。就像你不会等到厨房完全脏了才洗一个碗，你也不应该等到代码完全腐化了才去重构。

每次加新功能前，花五分钟检查一下相关代码。变量名清晰吗？函数太长吗？有没有可以复用的逻辑？**小步快走比一次性重写更安全，也更可持续。**
