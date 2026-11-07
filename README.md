<div align="center">

# 🧩 DSA Lab

### Watch it. Understand it. Explain it.

An interactive playground for learning sorting and pathfinding algorithms.

![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css&logoColor=white)

**14 algorithms · Reversible playback · Interactive practice**

</div>

---

## The Idea

Understanding an algorithm takes more than memorizing its code.

**DSA Lab makes the process visible.** Watch values move, explore how a search finds its way around obstacles, and pause to understand why each decision happens. Then check your understanding with a short practice question.

Built by combining and extending my **SortingVisualizer** and **PathFinder** projects into one learning experience.

## Explore → Understand → practice

| Explore | Understand | practice |
| :--- | :--- | :--- |
| Change an array or build a grid. | Learn the idea behind each step. | Predict an algorithm’s behavior. |
| Play, pause, rewind, or advance one step. | Review complexity and practical trade-offs. | Get immediate feedback and an explanation. |
| Follow comparisons, writes, and search routes. | Prepare to explain your reasoning in an interview. | Save your progress across lessons. |

## Features

### ↕️ Make Sorting Visible
Enter your own values or generate an array. Follow the active elements, watch values reach their final positions, and inspect comparison and write counts.

### 🧭 Build a Pathfinding Challenge
Place walls, move the start and goal, and see how different search strategies explore the same grid.

### ⏯️ Learn at Your Own Pace
Control playback speed, revisit a previous step, or scrub through an entire execution. Each snapshot includes a description of what happened.

### 💡 Connect the Steps to the Concept
Explore use cases, time and space complexity, and interview discussion prompts alongside each visualization.

### ✅ Check Your Understanding
Answer a prediction question for each algorithm and read the reasoning behind the answer. Progress stays saved in your browser.

## The Algorithm Collection

| Sorting · 10 Algorithms | Graphs & Paths · 4 Algorithms |
| :--- | :--- |
| Bubble Sort | Breadth-First Search |
| Selection Sort | Depth-First Search |
| Insertion Sort | Dijkstra’s Algorithm |
| Merge Sort | A* Search |
| Quick Sort | |
| Heap Sort | |
| Counting Sort | |
| Radix Sort | |
| Shell Sort | |
| Cocktail Shaker Sort | |

## Understanding the Metrics

The visualizer tracks what happens during execution, helping you compare how algorithms approach the same input.

| Metric | What It Means |
| :--- | :--- |
| **Key comparisons** | How many times the sorting algorithm compares values to determine their order. |
| **Array writes** | How many times the algorithm updates a position in the main array. A swap typically involves two writes. |
| **Visited cells** | How many grid cells the search visits while looking for the goal. |
| **Route moves** | The number of steps along the discovered route from start to goal. |

**Try it:** run different algorithms on the same array or grid and compare their counts. Which explores fewer cells? Which performs more writes?

> Counting and radix sort do not compare keys, so their comparison count is zero. Playback speed controls the animation; it is not a measure of algorithm runtime.

## Behind the Interface

The application separates **algorithm execution** from **visual rendering**.

```text
Choose an algorithm and configure its input
                     ↓
Generate immutable execution snapshots
                     ↓
Navigate snapshots with playback controls
                     ↓
Render the current state, explanation, and metrics
```

This structure supports backward and forward navigation without direct DOM manipulation. Playback resets when the lesson or input changes, keeping the visualization consistent.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Interface | React 18 |
| Algorithm engine | JavaScript |
| Styling | CSS |
| Development & build | Vite |
| Automated checks | Node.js test runner |
| Progress storage | Browser localStorage |

## Run Locally

Requires **Node.js 22** and **npm**.

```bash
git clone https://github.com/jinaldave3/dsa-lab.git
cd dsa-lab
npm ci
npm run dev
```

Open **http://127.0.0.1:8770/**.

**No account, API key, or paid service required.**

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start the development server |
| `npm test` | Run algorithm and lesson checks |
| `npm run build` | Generate the production build |
| `npm run preview` | Preview the production build |

## Implementation Notes

- The grid supports four-direction movement, with every move costing one.
- BFS, Dijkstra, and A* find shortest routes under these conditions. DFS does not guarantee the shortest route.
- Dijkstra and A* use sorted array frontiers rather than priority queues; the lessons describe this implementation’s complexity.
- Space complexity descriptions exclude the snapshots stored for visualization.
- The highlighted execution outline describes shared phases rather than executable pseudocode.
- Practice progress records correctly answered questions and is saved locally in the browser.

## Project Origins

DSA Lab brings together my earlier projects:

- [SortingVisualizer](https://github.com/jinaldave3/SortingVisualizer)
- [PathFinder](https://github.com/jinaldave3/PathFinder)

The combined app adds a unified interface, a trace-based execution engine, reversible playback, learning notes, and practice questions.

---

<div align="center">

**Built by [Jinal Dave](https://github.com/jinaldave3)**

*From watching an algorithm work to explaining why it works.*

</div>
