import test from 'node:test';import assert from 'node:assert/strict';
import{sortIds,graphIds,sortTrace,graphTrace}from'../src/algorithms.js';
import{lessons}from'../src/lessons.js';
for(const id of sortIds)test(`${id}: ordering, trace counts, unchanged input`,()=>{
 let seed=123;
 const cases=[[1],[0,0,0],[3,2,1],[1,2,3],[9,2,9,0,5],[999,1,0],...Array.from({length:8},()=>Array.from({length:12},()=>{seed=(1664525*seed+1013904223)>>>0;return seed%50;}))];
 for(const input of cases){const original=[...input],frames=sortTrace(id,input),last=frames.at(-1);assert.deepEqual(last.array,[...input].sort((a,b)=>a-b));assert.deepEqual(input,original);assert.equal(last.sorted.length,input.length);for(let i=1;i<frames.length;i++){assert.ok(frames[i].comparisons>=frames[i-1].comparisons);assert.ok(frames[i].writes>=frames[i-1].writes);assert.notEqual(frames[i].array,frames[i-1].array);}}
});
test('trace snapshots support previous/next playback without shared arrays',()=>{const frames=sortTrace('bubble',[3,1,2]);const original=[...frames[0].array];frames.at(-1).array[0]=900;assert.deepEqual(frames[0].array,original);});
test('bubble counts key comparisons and main-array writes',()=>{const last=sortTrace('bubble',[3,2,1]).at(-1);assert.equal(last.comparisons,3);assert.equal(last.writes,6);});
test('unsupported inputs are rejected',()=>{for(const input of [[],[-1,2],[1.5,2],Array(101).fill(1)])assert.throws(()=>sortTrace('quick',input));assert.throws(()=>sortTrace('fake',[1]));});
for(const id of graphIds)test(`${id}: reachable, blocked, and same endpoint`,()=>{
 const grid={rows:5,cols:6,start:0,end:29,walls:[3,9,15,21]},copy=JSON.stringify(grid),frames=graphTrace(id,grid),last=frames.at(-1);assert.equal(JSON.stringify(grid),copy);assert.equal(last.path[0],0);assert.equal(last.path.at(-1),29);assert.equal(new Set(last.visited).size,last.visited.length);for(let i=1;i<last.path.length;i++){const a=last.path[i-1],b=last.path[i];assert.equal(Math.abs(Math.floor(a/6)-Math.floor(b/6))+Math.abs(a%6-b%6),1);assert.ok(!grid.walls.includes(b));}
 assert.deepEqual(graphTrace(id,{rows:2,cols:2,start:0,end:3,walls:[1,2]}).at(-1).path,[]);
 assert.deepEqual(graphTrace(id,{rows:2,cols:2,start:0,end:0,walls:[]}).at(-1).path,[0]);
});
test('BFS, Dijkstra and A* agree on shortest route length for seeded obstacles',()=>{for(let seed=1;seed<=15;seed++){const walls=Array.from({length:80},(_,i)=>i).filter(i=>i!==0&&i!==79&&((i*17+seed*13)%11)<3);const grid={rows:8,cols:10,start:0,end:79,walls};const lengths=['bfs','dijkstra','astar'].map(id=>graphTrace(id,grid).at(-1).path.length);assert.equal(lengths[0],lengths[1]);assert.equal(lengths[1],lengths[2]);}});
test('all 14 implementations have distinct lessons and valid answer keys',()=>{assert.equal(lessons.length,14);assert.equal(new Set(lessons.map(l=>l.id)).size,14);for(const l of lessons){assert.ok([...sortIds,...graphIds].includes(l.id));assert.ok(l.answer>=0&&l.answer<l.options.length);assert.ok(l.why&&l.complexity&&l.prompt);}});
