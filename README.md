# DSA Lab

**Learn algorithms by watching, experimenting, and explaining.**

DSA Lab brings [SortingVisualizer](https://github.com/jinaldave3/SortingVisualizer) and [PathFinder](https://github.com/jinaldave3/PathFinder) together as one interactive learning app. It expands the visualization idea with reversible playback, explanations, interview prompts, and practice questions.

## Explore → Understand → Practise

- **Explore:** enter an array or build a grid, then play, pause, step backward or forward, or scrub through the execution.
- **Understand:** read the algorithm's purpose, complexity, use cases, and interview discussion prompt.
- **Practise:** answer a prediction question, get an explanation, and track correct answers on your device.

### 14 algorithm lessons

| Sorting | Graphs and paths |
| --- | --- |
| Bubble, Selection, Insertion, Merge, Quick | Breadth-first search, Depth-first search |
| Heap, Counting, Radix, Shell, Cocktail Shaker | Dijkstra, A* |

Sorting includes custom arrays and comparison/write counts. Pathfinding includes editable walls, movable start and goal cells, visited-cell counts, and route length. BFS, Dijkstra, and A* find shortest routes on this equal-cost grid; DFS does not guarantee the shortest route.

## Run locally

Requires Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open **http://127.0.0.1:8770/**. No account, API key, or paid service is required. Practice progress is stored in this browser's local storage.

```bash
npm test       # algorithm and lesson checks
npm run build # production files in dist/
npm run preview
```

## Built with

React 18, JavaScript, CSS, Vite, and Node's built-in test runner. Pure algorithm functions generate immutable execution snapshots; React renders the selected snapshot. Playback uses a single cancellable timer and resets when the lesson or input changes.

## Measurement notes

- Comparison counts measure key comparisons; writes count changes to the main array. Counting and radix sort do not compare keys.
- Playback speed is a viewing preference, not a benchmark.
- Complexity descriptions exclude memory used by visualization snapshots. Dijkstra and A* currently sort array frontiers rather than using a priority queue; lessons describe this implementation's cost.
- The highlighted execution outline describes shared phases, not line-by-line executable pseudocode.
- The app covers sorting and grid search, not the full DSA interview curriculum. Correct-answer progress records practice completion, not mastery.
- Custom sorting inputs support up to 100 nonnegative integers, each no greater than 999. Large traces can use more memory.

## Project origins

Created from the learning goals and algorithm coverage of Jinal Dave's two existing projects, linked above. The combined interface and trace-based algorithm engine were rebuilt for consistent playback and learning features. The original repositories remain separate and unchanged.
