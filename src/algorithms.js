// Trace generators adapt the two original visualizers into pure, replayable lessons.
// No DOM manipulation or timers here: React owns rendering and playback.
export const sortIds=['bubble','selection','insertion','merge','quick','heap','counting','radix','shell','cocktail'];
export const graphIds=['bfs','dfs','dijkstra','astar'];
export function sortTrace(id,input){
 if(!sortIds.includes(id))throw new Error('Unknown sorting algorithm');
 if(!input.length||input.length>100||input.some(x=>!Number.isInteger(x)||x<0||x>999))throw new Error('Use 1–100 whole numbers from 0 to 999.');
 const a=[...input],frames=[];let comparisons=0,writes=0;const done=new Set();
 const emit=(note,active=[],line=0)=>frames.push({array:[...a],active:[...active],sorted:[...done],comparisons,writes,note,line});
 const compare=(i,j)=>{comparisons++;emit(`Compare ${a[i]} and ${a[j]}.`,[i,j],1);return a[i]-a[j];};
 const swap=(i,j)=>{if(i!==j){[a[i],a[j]]=[a[j],a[i]];writes+=2;emit(`Exchange positions ${i+1} and ${j+1}.`,[i,j],2);}};
 const write=(i,value,note='Write the next value into position.')=>{a[i]=value;writes++;emit(note,[i],2);};
 emit('Start with this input. Follow one operation at a time.');
 if(id==='bubble'||id==='cocktail'){
  let lo=0,hi=a.length-1;
  while(lo<hi){let changed=false;for(let i=lo;i<hi;i++)if(compare(i,i+1)>0){swap(i,i+1);changed=true;}done.add(hi);hi--;emit('The largest remaining value is in its final position.',[],3);if(!changed)break;
   if(id==='cocktail'){changed=false;for(let i=hi;i>lo;i--)if(compare(i-1,i)>0){swap(i-1,i);changed=true;}done.add(lo++);emit('The smallest remaining value is in its final position.',[],3);if(!changed)break;}
  }
 }else if(id==='selection'){
  for(let i=0;i<a.length;i++){let min=i;for(let j=i+1;j<a.length;j++)if(compare(j,min)<0)min=j;swap(i,min);done.add(i);emit('Place the smallest remaining value at the front.',[i],3);}
 }else if(id==='insertion'||id==='shell'){
  for(let gap=id==='shell'?Math.floor(a.length/2):1;gap>=1;gap=id==='shell'?Math.floor(gap/2):0){emit(`Work with a gap of ${gap}.`,[],0);for(let i=gap;i<a.length;i++){const value=a[i];let j=i;while(j>=gap){comparisons++;emit(`Compare ${a[j-gap]} with held value ${value}.`,[j-gap,j],1);if(a[j-gap]<=value)break;write(j,a[j-gap],'Shift the larger value to the right.');j-=gap;}write(j,value,'Insert the held value in its current sorted group.');}emit('This pass is complete.',[],3);}
 }else if(id==='merge'){
  const merge=(lo,hi)=>{if(hi-lo<2)return;const mid=Math.floor((lo+hi)/2);merge(lo,mid);merge(mid,hi);const left=a.slice(lo,mid),right=a.slice(mid,hi);let i=0,j=0,k=lo;emit(`Merge positions ${lo+1}–${mid} and ${mid+1}–${hi}.`,[],0);while(i<left.length&&j<right.length){comparisons++;emit(`Compare ${left[i]} and ${right[j]} from temporary halves.`,[lo+i,mid+j],1);write(k++,left[i]<=right[j]?left[i++]:right[j++]);}while(i<left.length)write(k++,left[i++]);while(j<right.length)write(k++,right[j++]);emit('The merged range is ordered.',[],3);};merge(0,a.length);
 }else if(id==='quick'){
  const quick=(lo,hi)=>{if(lo>hi)return;if(lo===hi){done.add(lo);return;}const pivot=a[hi];emit(`Choose ${pivot} as the pivot.`,[hi],0);let p=lo;for(let j=lo;j<hi;j++){comparisons++;emit(`Compare ${a[j]} with pivot ${pivot}.`,[j,hi],1);if(a[j]<=pivot)swap(p++,j);}swap(p,hi);done.add(p);emit('The pivot is in its final position.',[p],3);quick(lo,p-1);quick(p+1,hi);};quick(0,a.length-1);
 }else if(id==='heap'){
  const heapify=(size,root)=>{let largest=root,l=2*root+1,r=l+1;if(l<size&&compare(l,largest)>0)largest=l;if(r<size&&compare(r,largest)>0)largest=r;if(largest!==root){swap(root,largest);heapify(size,largest);}};
  emit('Build a max heap: every parent is at least as large as its children.',[],0);for(let i=Math.floor(a.length/2)-1;i>=0;i--)heapify(a.length,i);for(let end=a.length-1;end>0;end--){swap(0,end);done.add(end);emit('Move the heap maximum into its final position.',[end],3);heapify(end,0);}
 }else if(id==='counting'){
  const counts=Array(Math.max(...a)+1).fill(0);a.forEach((x,i)=>{counts[x]++;emit(`Count value ${x}: it now occurs ${counts[x]} time(s).`,[i],1);});let i=0;counts.forEach((count,value)=>{for(let n=0;n<count;n++)write(i++,value,'Reconstruct the array in increasing value order.');});
 }else if(id==='radix'){
  const max=Math.max(...a);for(let exp=1;exp<=max;exp*=10){const buckets=Array.from({length:10},()=>[]);a.forEach((value,i)=>{const digit=Math.floor(value/exp)%10;buckets[digit].push(value);emit(`Digit place ${exp}: send ${value} to bucket ${digit}.`,[i],1);});buckets.flat().forEach((v,i)=>write(i,v,'Collect buckets in order, preserving order within each bucket.'));emit(`Digit pass ${exp} complete.`,[],3);}
 }
 a.forEach((_,i)=>done.add(i));emit('Finished. Every value is in nondecreasing order.',[],3);return frames;
}
export function graphTrace(id,{rows,cols,start,end,walls=[]}){
 if(!graphIds.includes(id))throw new Error('Unknown graph algorithm');
 if(!Number.isInteger(rows)||!Number.isInteger(cols)||rows<1||cols<1||rows*cols>3000||![start,end].every(x=>Number.isInteger(x)&&x>=0&&x<rows*cols))throw new Error('Invalid grid');
 const blocked=new Set(walls);if(blocked.has(start)||blocked.has(end))throw new Error('Endpoints must be open');
 const seen=new Set([start]),visited=[],parent=new Map(),cost=new Map([[start,0]]),frames=[];let frontier=[start];
 const h=n=>Math.abs(Math.floor(n/cols)-Math.floor(end/cols))+Math.abs(n%cols-end%cols);
 const emit=(note,current=null,path=[],line=0)=>frames.push({visited:[...visited],frontier:[...frontier],current,path:[...path],note,line});
 const neighbors=n=>{const r=Math.floor(n/cols),c=n%cols;return [[r,c+1],[r+1,c],[r,c-1],[r-1,c]].filter(([r,c])=>r>=0&&r<rows&&c>=0&&c<cols).map(([r,c])=>r*cols+c);};
 emit('Start with the start node in the frontier.');let found=false;
 while(frontier.length){if(id==='dijkstra'||id==='astar')frontier.sort((a,b)=>(cost.get(a)+(id==='astar'?h(a):0))-(cost.get(b)+(id==='astar'?h(b):0)));
  const current=id==='dfs'?frontier.pop():frontier.shift();visited.push(current);emit(`Visit row ${Math.floor(current/cols)+1}, column ${current%cols+1}.`,current,[],1);
  if(current===end){found=true;break;}
  for(const n of neighbors(current)){if(blocked.has(n))continue;const nextCost=cost.get(current)+1;if(!seen.has(n)){seen.add(n);parent.set(n,current);cost.set(n,nextCost);frontier.push(n);}else if((id==='dijkstra'||id==='astar')&&!visited.includes(n)&&nextCost<cost.get(n)){parent.set(n,current);cost.set(n,nextCost);}}
  emit('Add eligible neighbors to the frontier.',current,[],2);
 }
 const path=[];if(found){let n=end;while(n!==undefined){path.unshift(n);n=parent.get(n);}for(let i=1;i<=path.length;i++)emit('Trace predecessor links back to the start.',path[i-1],path.slice(0,i),3);}
 emit(found?`Route found: ${path.length-1} moves. ${id==='dfs'?'DFS does not guarantee the shortest route.':'All moves have equal cost on this grid.'}`:'No route exists through the open cells.',null,path,3);return frames;
}
