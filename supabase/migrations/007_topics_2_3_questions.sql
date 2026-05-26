-- 007_topics_2_3_questions.sql
-- Seeds 55 questions × 3 tracks for Topic 2 (Algorithmic Thinking) and Topic 3 (Data Structures)
-- Same pattern as 002_sample_questions.sql:
--   Questions 1-10:  unique hand-crafted MCQs  (is_free = true)
--   Questions 11-50: bulk template via generate_series (is_free = true)
--   Questions 51-55: paywall questions          (is_free = false)

do $$
declare
  t2 uuid;
  t3 uuid;
begin
  select id into t2 from public.topics where order_index = 2;
  select id into t3 from public.topics where order_index = 3;

  -- ══════════════════════════════════════════════════════
  --  TOPIC 2: Algorithmic Thinking
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t2, 1, 'story', 'mcq', 'ARIA follows a recipe step by step to bake cookies. What is this kind of plan called?', '["Algorithm","Recipe","Code","Drawing"]', 'Algorithm', 'An algorithm is a step-by-step plan to solve a problem — just like a recipe tells you exactly what to do!', true),
  (t2, 2, 'story', 'mcq', 'ARIA''s robot must walk through a maze, one step at a time. What is she following?', '["A map","An algorithm","A story","A shortcut"]', 'An algorithm', 'An algorithm is a clear set of instructions. ARIA follows each step in order to reach the end of the maze!', true),
  (t2, 3, 'story', 'mcq', 'Which word describes doing the same action over and over in a program?', '["Loop","Skip","Jump","Stop"]', 'Loop', 'A loop repeats instructions — like asking ARIA to wave her hand 10 times without writing it 10 times!', true),
  (t2, 4, 'story', 'mcq', 'ARIA sorts her toys: big ones first, then small ones. This is a type of?', '["Story","Sorting algorithm","Loop","Bug"]', 'Sorting algorithm', 'A sorting algorithm puts things in order — by size, colour, or any rule you choose!', true),
  (t2, 5, 'story', 'mcq', 'ARIA puts one toy away, then the next, then the next, in order. This is called?', '["Looping","Sequential steps","Random","Backward"]', 'Sequential steps', 'Sequential means one after another. Algorithms follow steps in sequence — no skipping!', true),
  (t2, 6, 'story', 'mcq', 'ARIA says: "IF the block is red, put it in the red box. OTHERWISE put it in the blue box." What is this?', '["A loop","A condition","A bug","A sort"]', 'A condition', 'A condition (IF/ELSE) lets ARIA make decisions. Different inputs lead to different actions!', true),
  (t2, 7, 'story', 'mcq', 'What do we call a mistake in a robot''s instructions?', '["A loop","A bug","A feature","A step"]', 'A bug', 'A bug is an error in instructions that causes wrong behaviour. Fixing bugs is called debugging!', true),
  (t2, 8, 'story', 'mcq', 'ARIA''s steps are: 1) pick up toy  2) put in box  3) repeat. Step 3 is a?', '["Condition","Loop","Start","End"]', 'Loop', '"Repeat" means go back to step 1 — that is a loop! It keeps going until all toys are away.', true),
  (t2, 9, 'story', 'mcq', 'If ARIA''s steps are in the WRONG order, what happens?', '["Still works fine","Robot gets confused","Nothing changes","Runs faster"]', 'Robot gets confused', 'Order matters in algorithms! If you put on shoes before socks you have a problem — same with code.', true),
  (t2, 10, 'story', 'mcq', 'A good algorithm must be:', '["Creative and random","Clear, step-by-step and unambiguous","Written in Python only","Secret"]', 'Clear, step-by-step and unambiguous', 'Algorithms must be clear and precise so any robot (or computer) can follow them exactly the same way every time!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'story', 'mcq',
    'ARIA''s Step Challenge #' || n || ': What must ARIA do FIRST when following an algorithm?',
    '["Skip random steps","Follow the steps in order","Jump to the last step","Make up new steps"]',
    'Follow the steps in order', 'Algorithms must be followed in exact order — that is what makes them reliable and predictable!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'story', 'mcq',
    'ARIA''s Expert Challenge #' || n || ': What is the BEST algorithm to find one item in a sorted list of 1 million items?',
    '["Check every item one by one","Binary search","Bubble sort","Random guess"]',
    'Binary search', 'Binary search finds items in O(log n) steps — only about 20 steps for 1 million items!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t2, 1, 'levels', 'mcq', 'What is an algorithm?', '["A programming language","A step-by-step problem-solving procedure","A type of computer","A coding error"]', 'A step-by-step problem-solving procedure', 'An algorithm is a precise, ordered set of instructions for solving a problem or completing a task.', true),
  (t2, 2, 'levels', 'mcq', 'Which sorting algorithm repeatedly swaps adjacent elements that are in the wrong order?', '["Merge Sort","Quick Sort","Bubble Sort","Selection Sort"]', 'Bubble Sort', 'Bubble Sort compares neighbours and swaps them until the list is sorted — large values "bubble up" to the end.', true),
  (t2, 3, 'levels', 'mcq', 'In Big-O notation, O(1) means the algorithm:', '["Gets slower as data grows","Always takes constant time regardless of input size","Requires exactly 1 second","Has one step only"]', 'Always takes constant time regardless of input size', 'O(1) = constant time. No matter how large the input, the operation takes the same amount of time.', true),
  (t2, 4, 'levels', 'mcq', 'In a flowchart, what does the diamond shape represent?', '["A loop","A decision (if/else branch)","The start","Data storage"]', 'A decision (if/else branch)', 'Diamonds represent decisions in flowcharts — they have two exit paths (YES/NO or TRUE/FALSE).', true),
  (t2, 5, 'levels', 'mcq', 'Binary search requires the list to be:', '["Unsorted","Sorted","Short","Contain even numbers only"]', 'Sorted', 'Binary search works by halving the search space. This only works if elements are in sorted order.', true),
  (t2, 6, 'levels', 'mcq', 'Which loop always executes its body at least once before checking the condition?', '["for loop","while loop","do-while loop","if loop"]', 'do-while loop', 'A do-while loop runs the body FIRST, then checks the condition — guaranteeing at least one execution.', true),
  (t2, 7, 'levels', 'mcq', 'What is the worst-case time complexity of Bubble Sort?', '["O(1)","O(n)","O(n²)","O(log n)"]', 'O(n²)', 'In the worst case, Bubble Sort compares every pair — n passes of n comparisons gives O(n²).', true),
  (t2, 8, 'levels', 'mcq', 'Recursion is when a function:', '["Calls another function","Calls itself","Returns a value twice","Uses a loop internally"]', 'Calls itself', 'A recursive function solves a problem by calling itself with a smaller version of the same problem.', true),
  (t2, 9, 'levels', 'mcq', 'Breaking a large problem into smaller sub-problems and combining results is:', '["Looping","Recursion","Divide and Conquer","Debugging"]', 'Divide and Conquer', 'Divide and Conquer splits the problem, solves each part independently, then merges — used in Merge Sort, Quick Sort.', true),
  (t2, 10, 'levels', 'mcq', 'Which data structure does the call stack use during recursive function calls?', '["Queue","Stack","Array","Tree"]', 'Stack', 'Each recursive call is pushed onto the call stack (LIFO). When a call returns it is popped off the stack.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'levels', 'mcq',
    'Algorithm Practice #' || n || ': Which search algorithm has O(log n) time complexity?',
    '["Linear search","Bubble Sort","Binary search","Insertion Sort"]',
    'Binary search', 'Binary search halves the search space each step, giving O(log n) — much faster than O(n) linear search.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'levels', 'mcq',
    'Advanced Algorithm #' || n || ': What is the time complexity of Merge Sort?',
    '["O(n²)","O(n log n)","O(log n)","O(n)"]',
    'O(n log n)', 'Merge Sort divides the list (log n levels) and merges at each level (n work), giving O(n log n) overall.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t2, 1, 'sandbox', 'mcq', 'What is the time complexity of binary search on a sorted array of n elements?', '["O(n)","O(n²)","O(log n)","O(n log n)"]', 'O(log n)', 'Binary search eliminates half the remaining elements each step: T(n) = T(n/2) + O(1) → O(log n).', true),
  (t2, 2, 'sandbox', 'mcq', 'Merge sort uses which algorithmic strategy?', '["Greedy","Dynamic Programming","Divide and Conquer","Backtracking"]', 'Divide and Conquer', 'Merge sort splits the array in half recursively, sorts each half, then merges — classic Divide and Conquer.', true),
  (t2, 3, 'sandbox', 'mcq', 'A greedy algorithm makes decisions by:', '["Finding the global optimum always","Making the locally optimal choice at each step","Exploring all possibilities","Using dynamic programming"]', 'Making the locally optimal choice at each step', 'Greedy algorithms choose the best option at each step. This does NOT guarantee a global optimum in all problems.', true),
  (t2, 4, 'sandbox', 'mcq', 'Which sorting algorithm has O(n log n) average-case time complexity?', '["Bubble Sort","Insertion Sort","Quick Sort","Selection Sort"]', 'Quick Sort', 'Quick Sort partitions around a pivot in O(n) and recurses on each half — O(n log n) average, O(n²) worst case.', true),
  (t2, 5, 'sandbox', 'mcq', 'Dynamic programming solves optimisation problems by:', '["Trying all combinations brute-force","Breaking into overlapping subproblems and caching results","Using recursion without memoization","Always sorting data first"]', 'Breaking into overlapping subproblems and caching results', 'DP stores subproblem results (memoization/tabulation) to avoid redundant computation — turning exponential into polynomial.', true),
  (t2, 6, 'sandbox', 'mcq', 'Stack overflow in recursion occurs because:', '["Memory allocation fails generally","Each recursive call adds a frame; depth exceeds the call stack limit","The loop counter overflows","Data becomes corrupted"]', 'Each recursive call adds a frame; depth exceeds the call stack limit', 'Without a proper base case or with deep recursion, the call stack grows until the OS-imposed limit is hit.', true),
  (t2, 7, 'sandbox', 'mcq', 'The Travelling Salesman Problem (TSP) is classified as:', '["Solvable in polynomial time","NP-hard","Linear time with Dijkstra","Solved by BFS in O(n²)"]', 'NP-hard', 'TSP has no known polynomial-time exact solution. It is NP-hard — brute force is O(n!) for n cities.', true),
  (t2, 8, 'sandbox', 'mcq', 'Amortized analysis gives the:', '["Worst-case cost of a single operation","Average cost per operation over a sequence of operations","Best-case cost","Space complexity"]', 'Average cost per operation over a sequence of operations', 'Amortized analysis (e.g. for dynamic arrays) spreads the cost of expensive operations over many cheap ones.', true),
  (t2, 9, 'sandbox', 'mcq', 'Fibonacci computed with memoization uses which paradigm?', '["Greedy","Divide and Conquer","Dynamic Programming","Backtracking"]', 'Dynamic Programming', 'Caching previously computed fib(n) values avoids recomputation — this is top-down DP (memoization).', true),
  (t2, 10, 'sandbox', 'mcq', 'A data structure providing O(1) average-case lookup by key uses:', '["Binary tree","Linked List","Hash Table","Sorted array"]', 'Hash Table', 'Hash tables map keys to indices via a hash function, enabling average O(1) insert, delete, and lookup.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'sandbox', 'mcq',
    'Advanced Algorithms #' || n || ': What is the space complexity of recursive Fibonacci WITHOUT memoization?',
    '["O(1)","O(n)","O(n²)","O(log n)"]',
    'O(n)', 'The call stack grows up to n frames deep before unwinding, giving O(n) space for naive recursive Fibonacci.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'sandbox', 'mcq',
    'Expert Algorithms #' || n || ': Floyd-Warshall finds shortest paths between:',
    '["Single source to all vertices","All pairs of vertices using DP in O(V³)","Only adjacent nodes","Tree nodes only"]',
    'All pairs of vertices using DP in O(V³)', 'Floyd-Warshall uses dynamic programming to compute shortest paths between all pairs in O(V³) time and O(V²) space.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;


  -- ══════════════════════════════════════════════════════
  --  TOPIC 3: Data Structures
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t3, 1, 'story', 'mcq', 'ARIA has a list of her friends'' names stored in order. What is this called?', '["A loop","An array","A bug","A sort"]', 'An array', 'An array stores items in order, one after another. You can find any item by its position number!', true),
  (t3, 2, 'story', 'mcq', 'ARIA stacks books on top of each other. She can ONLY take the TOP book off. What structure is this?', '["Queue","Stack","Array","List"]', 'Stack', 'A stack is like a pile of books — you add and remove from the top only. Last in, first out!', true),
  (t3, 3, 'story', 'mcq', 'ARIA waits in a lunch line — the first person in is served first. What data structure is this like?', '["Stack","Queue","Array","Tree"]', 'Queue', 'A queue is like a real queue — first in, first out (FIFO). Fair and orderly!', true),
  (t3, 4, 'story', 'mcq', 'ARIA''s toy box: index 0 = teddy, index 1 = car, index 2 = ball. What does "index" mean?', '["The toy''s name","Its position number","Its colour","Its size"]', 'Its position number', 'An index is the position of an item in an array. Index 0 is the first item, index 1 is second, and so on!', true),
  (t3, 5, 'story', 'mcq', 'In a stack, which item do you always remove first?', '["Bottom","Middle","Top","Random"]', 'Top', 'Stacks use LIFO — Last In, First Out. The most recently added item is always removed first!', true),
  (t3, 6, 'story', 'mcq', 'ARIA''s robot family is drawn like a tree, with ARIA at the very top. ARIA is the:', '["Leaf","Root","Branch","Node"]', 'Root', 'The root is the top of a tree structure — it has no parent. ARIA is the root because she is at the top!', true),
  (t3, 7, 'story', 'mcq', 'A shopping app stores items one after another and you can access any item by number. This is most like a:', '["Stack","Loop","Array","Tree"]', 'Array', 'Arrays store items in numbered positions so you can jump directly to any item by index!', true),
  (t3, 8, 'story', 'mcq', 'ARIA adds a ball to the BACK of her toy queue. The next ball to be taken out is from the:', '["Back","Middle","Front","Top"]', 'Front', 'In a queue, new items join at the back but items leave from the front — just like a real line!', true),
  (t3, 9, 'story', 'mcq', 'Two nodes connected by a line in a data structure diagram — what is the line called?', '["A branch","A root","An edge","An index"]', 'An edge', 'An edge is the connection (link) between two nodes in a tree or graph structure.', true),
  (t3, 10, 'story', 'mcq', 'Which structure is like a real-world queue at a shop — first in, first served?', '["Stack","Queue","Tree","Graph"]', 'Queue', 'A queue follows FIFO — First In, First Out — exactly like standing in line at a shop!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'story', 'mcq',
    'ARIA''s Toy Box Challenge #' || n || ': Which structure removes items from the SAME end they were added?',
    '["Queue","Stack","Array","Linked List"]',
    'Stack', 'A stack is LIFO — Last In First Out. The last item added is the first one removed, like a stack of plates!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'story', 'mcq',
    'ARIA''s Expert Storage #' || n || ': Which structure is BEST for a priority waiting list where highest priority goes first?',
    '["Regular Array","Stack","Priority Queue","Linked List"]',
    'Priority Queue', 'A priority queue always gives you the highest-priority item first — perfect for emergency queues and scheduling!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t3, 1, 'levels', 'mcq', 'Which data structure operates on LIFO (Last In, First Out)?', '["Queue","Stack","Array","Linked List"]', 'Stack', 'A stack only allows access to the top element. The last item pushed is the first one popped — LIFO.', true),
  (t3, 2, 'levels', 'mcq', 'What is the time complexity of accessing an element by index in an array?', '["O(n)","O(log n)","O(1)","O(n²)"]', 'O(1)', 'Arrays store elements at contiguous memory locations — you calculate the address directly, so access is O(1).', true),
  (t3, 3, 'levels', 'mcq', 'In a singly linked list, each node stores:', '["Only data","Data and a pointer to the next node","Two pointers (prev and next)","An array of values"]', 'Data and a pointer to the next node', 'Singly linked list nodes hold a value and a next pointer. To traverse, you follow pointers from head to tail.', true),
  (t3, 4, 'levels', 'mcq', 'Which operation is O(n) in a singly linked list?', '["Insertion at head","Deletion at head","Random access by index","Finding the length (if stored)"]', 'Random access by index', 'There is no direct index access in linked lists — you must traverse from head, making it O(n).', true),
  (t3, 5, 'levels', 'mcq', 'A binary tree node has at most how many children?', '["1","2","3","Unlimited"]', '2', 'Binary means two. Each node has at most a left child and a right child — that is what makes it binary.', true),
  (t3, 6, 'levels', 'mcq', 'Which data structure best implements a browser''s back button?', '["Queue","Stack","Hash Table","Graph"]', 'Stack', 'Each visited page is pushed onto a stack. Pressing Back pops the stack — LIFO matches browser history.', true),
  (t3, 7, 'levels', 'mcq', 'In a queue, new elements are inserted at the:', '["Front","Top","Rear (back)","Middle"]', 'Rear (back)', 'Queues use FIFO — elements enqueue at the rear and dequeue from the front.', true),
  (t3, 8, 'levels', 'mcq', 'What makes a hash table fast for key lookups?', '["It stores data sorted","A hash function maps keys to array indices","It uses binary search","It uses a tree internally"]', 'A hash function maps keys to array indices', 'The hash function computes an index from the key, allowing O(1) average access without searching.', true),
  (t3, 9, 'levels', 'mcq', 'A graph where every edge has a direction is called:', '["Weighted graph","Undirected graph","Directed graph (digraph)","Spanning tree"]', 'Directed graph (digraph)', 'Directed graphs have edges that go one way (A → B does not imply B → A), unlike undirected edges.', true),
  (t3, 10, 'levels', 'mcq', 'The maximum number of nodes at level h of a complete binary tree is:', '["h","2h","2^h","h²"]', '2^h', 'Each level doubles the nodes: level 0 = 1, level 1 = 2, level 2 = 4 ... level h = 2^h nodes.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'levels', 'mcq',
    'Data Structures Drill #' || n || ': What is the time complexity of searching an unsorted array for a value?',
    '["O(1)","O(log n)","O(n)","O(n²)"]',
    'O(n)', 'In the worst case you check every element — linear O(n) search. Sort first to use O(log n) binary search.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'levels', 'mcq',
    'Advanced Data Structures #' || n || ': What is the time complexity of the heapify (build-heap) operation?',
    '["O(n log n)","O(n)","O(log n)","O(1)"]',
    'O(n)', 'Build-heap is O(n) — more efficient than inserting n elements one at a time which would be O(n log n).', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t3, 1, 'sandbox', 'mcq', 'Time complexity of inserting a node at the head of a singly linked list?', '["O(n)","O(1)","O(log n)","O(n²)"]', 'O(1)', 'Set new_node.next = head, then head = new_node — two pointer assignments, always O(1) regardless of list length.', true),
  (t3, 2, 'sandbox', 'mcq', 'A red-black tree maintains O(log n) balance guarantees by:', '["Rotations alone","Color assignments alone","Rotations and coloring nodes red or black based on insertion rules","Sorting on every insert"]', 'Rotations and coloring nodes red or black based on insertion rules', 'Red-black trees enforce coloring invariants (no two consecutive reds, equal black height) and fix violations with rotations.', true),
  (t3, 3, 'sandbox', 'mcq', 'Which data structure offers O(1) average-case insert, delete, and lookup?', '["BST","Heap","Hash Table","AVL Tree"]', 'Hash Table', 'With a good hash function and low load factor, hash tables achieve O(1) average for all three operations.', true),
  (t3, 4, 'sandbox', 'mcq', 'In a min-heap, the relationship between a parent and its children is:', '["Parent > both children","Parent = children","Parent ≤ both children","No defined relationship"]', 'Parent ≤ both children', 'Min-heap property: every parent is less than or equal to its children. The minimum element is always at the root.', true),
  (t3, 5, 'sandbox', 'mcq', 'A trie data structure is optimised for:', '["Numerical sorting","String prefix searches and autocomplete","Graph traversal","Queue-based scheduling"]', 'String prefix searches and autocomplete', 'Tries store characters at each node. All words sharing a prefix share the same path — enabling O(m) prefix lookups.', true),
  (t3, 6, 'sandbox', 'mcq', 'Dynamic arrays (like Python lists) achieve amortized O(1) appends because:', '["They never resize","Capacity doubles on overflow, spreading the O(n) copy cost over n insertions","They use linked nodes","Hashing handles overflow"]', 'Capacity doubles on overflow, spreading the O(n) copy cost over n insertions', 'Doubling strategy means O(n) copy happens every n inserts — amortized O(1) per insert via accounting argument.', true),
  (t3, 7, 'sandbox', 'mcq', 'Topological sorting is only applicable to:', '["Any connected graph","Directed Acyclic Graphs (DAGs)","Undirected graphs","Weighted graphs"]', 'Directed Acyclic Graphs (DAGs)', 'Topological sort requires a DAG — cycles make it impossible to linearise the dependency order.', true),
  (t3, 8, 'sandbox', 'mcq', 'In-order traversal of a Binary Search Tree (BST) visits nodes in:', '["Pre-order (root, left, right)","Post-order (left, right, root)","Ascending sorted order","Descending order"]', 'Ascending sorted order', 'In-order (left, root, right) on a BST visits nodes in ascending order — this is how you sort with a BST.', true),
  (t3, 9, 'sandbox', 'mcq', 'A deque (double-ended queue) supports:', '["LIFO only","FIFO only","Insert and delete at both ends in O(1)","Only access from the middle"]', 'Insert and delete at both ends in O(1)', 'Deques generalise both stacks and queues — push/pop at front AND rear, all O(1) with a doubly-linked list.', true),
  (t3, 10, 'sandbox', 'mcq', 'B-trees are preferred in database indexes because:', '["They use less memory than arrays","Nodes hold multiple keys, keeping the tree shallow and minimising disk I/O","They are faster than hash tables always","They are simpler to implement"]', 'Nodes hold multiple keys, keeping the tree shallow and minimising disk I/O', 'B-tree nodes map to disk blocks. A shallow tree = fewer disk reads per lookup — critical for database performance.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'sandbox', 'mcq',
    'DS Challenge #' || n || ': Which self-balancing BST rebalances using rotations to maintain O(log n) height?',
    '["Binary tree","AVL tree","B-tree","Heap"]',
    'AVL tree', 'AVL trees rebalance after insertions/deletions using single or double rotations to keep balance factor ∈ {-1, 0, 1}.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'sandbox', 'mcq',
    'Expert DS #' || n || ': A skip list achieves O(log n) average search by:',
    '["Sorting all elements","Maintaining multiple levels of linked lists with probabilistic forward pointers","Using a hash function","Balancing like an AVL tree"]',
    'Maintaining multiple levels of linked lists with probabilistic forward pointers', 'Skip lists layer linked lists with express lanes — each node is promoted with probability p, giving O(log n) search.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

end;
$$;
