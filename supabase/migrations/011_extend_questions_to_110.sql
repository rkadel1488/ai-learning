-- 011_extend_questions_to_110.sql
-- Doubles each topic's question bank from 55 to 110 questions per track.
-- Reuses the existing templated-bulk patterns (generate_series), continuing
-- the numbering: 56-100 are free template questions, 101-110 are paywall.

do $$
declare
  topic1_id uuid;
  t2 uuid;
  t3 uuid;
  t4 uuid;
  t5 uuid;
  t6 uuid;
  t7 uuid;
  t8 uuid;
  t9 uuid;
  t10 uuid;
begin
  select id into topic1_id from public.topics where order_index = 1;
  select id into t2 from public.topics where order_index = 2;
  select id into t3 from public.topics where order_index = 3;
  select id into t4 from public.topics where order_index = 4;
  select id into t5 from public.topics where order_index = 5;
  select id into t6 from public.topics where order_index = 6;
  select id into t7 from public.topics where order_index = 7;
  select id into t8 from public.topics where order_index = 8;
  select id into t9 from public.topics where order_index = 9;
  select id into t10 from public.topics where order_index = 10;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'story', 'mcq',
    'ARIA''s Logic Challenge #' || n || ': Which value makes the AND gate output TRUE?',
    '["Both inputs = 1","One input = 1","Both inputs = 0","Either input = 0"]',
    'Both inputs = 1', 'The AND gate outputs TRUE only when ALL inputs are TRUE (1).', true
  from generate_series(56, 100) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'story', 'mcq',
    'ARIA''s Advanced Challenge #' || n || ': What is the output of NOT(0 AND 1)?',
    '["0","1","Undefined","2"]',
    '1', 'First: 0 AND 1 = 0. Then NOT(0) = 1. Working inside-out gives us 1!', false
  from generate_series(101, 110) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'levels', 'mcq',
    'Logic Practice #' || n || ': Simplify A AND 1.',
    '["0","1","A","A''"]',
    'A', 'Identity Law: A AND 1 = A. Multiplying by 1 in Boolean leaves the value unchanged.', true
  from generate_series(56, 100) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'levels', 'mcq',
    'Advanced Logic #' || n || ': Apply De Morgan''s Law to NOT(A AND B).',
    '["NOT A AND NOT B","NOT A OR NOT B","A OR B","A AND B"]',
    'NOT A OR NOT B', 'De Morgan''s Law: NOT(A AND B) = NOT A OR NOT B. The NOT distributes and the AND flips to OR.', false
  from generate_series(101, 110) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'sandbox', 'mcq',
    'Challenge #' || n || ': Evaluate NOT(NOT A).',
    '["0","1","A","NOT A"]',
    'A', 'Double negation law: NOT(NOT A) = A. Negating twice returns the original value.', true
  from generate_series(56, 100) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select topic1_id, n, 'sandbox', 'mcq',
    'Expert #' || n || ': Minimise using Karnaugh map: F = A''B + AB'' + AB',
    '["A + B","A'' + B","A OR B","NOT A AND B"]',
    'A + B', 'The three minterms cover all cases except A=0,B=0. Karnaugh map groups them as A + B.', false
  from generate_series(101, 110) as n;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'story', 'mcq',
    'ARIA''s Step Challenge #' || n || ': What must ARIA do FIRST when following an algorithm?',
    '["Skip random steps","Follow the steps in order","Jump to the last step","Make up new steps"]',
    'Follow the steps in order', 'Algorithms must be followed in exact order — that is what makes them reliable and predictable!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'story', 'mcq',
    'ARIA''s Expert Challenge #' || n || ': What is the BEST algorithm to find one item in a sorted list of 1 million items?',
    '["Check every item one by one","Binary search","Bubble sort","Random guess"]',
    'Binary search', 'Binary search finds items in O(log n) steps — only about 20 steps for 1 million items!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'levels', 'mcq',
    'Algorithm Practice #' || n || ': Which search algorithm has O(log n) time complexity?',
    '["Linear search","Bubble Sort","Binary search","Insertion Sort"]',
    'Binary search', 'Binary search halves the search space each step, giving O(log n) — much faster than O(n) linear search.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'levels', 'mcq',
    'Advanced Algorithm #' || n || ': What is the time complexity of Merge Sort?',
    '["O(n²)","O(n log n)","O(log n)","O(n)"]',
    'O(n log n)', 'Merge Sort divides the list (log n levels) and merges at each level (n work), giving O(n log n) overall.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'sandbox', 'mcq',
    'Advanced Algorithms #' || n || ': What is the space complexity of recursive Fibonacci WITHOUT memoization?',
    '["O(1)","O(n)","O(n²)","O(log n)"]',
    'O(n)', 'The call stack grows up to n frames deep before unwinding, giving O(n) space for naive recursive Fibonacci.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t2, n, 'sandbox', 'mcq',
    'Expert Algorithms #' || n || ': Floyd-Warshall finds shortest paths between:',
    '["Single source to all vertices","All pairs of vertices using DP in O(V³)","Only adjacent nodes","Tree nodes only"]',
    'All pairs of vertices using DP in O(V³)', 'Floyd-Warshall uses dynamic programming to compute shortest paths between all pairs in O(V³) time and O(V²) space.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'story', 'mcq',
    'ARIA''s Toy Box Challenge #' || n || ': Which structure removes items from the SAME end they were added?',
    '["Queue","Stack","Array","Linked List"]',
    'Stack', 'A stack is LIFO — Last In First Out. The last item added is the first one removed, like a stack of plates!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'story', 'mcq',
    'ARIA''s Expert Storage #' || n || ': Which structure is BEST for a priority waiting list where highest priority goes first?',
    '["Regular Array","Stack","Priority Queue","Linked List"]',
    'Priority Queue', 'A priority queue always gives you the highest-priority item first — perfect for emergency queues and scheduling!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'levels', 'mcq',
    'Data Structures Drill #' || n || ': What is the time complexity of searching an unsorted array for a value?',
    '["O(1)","O(log n)","O(n)","O(n²)"]',
    'O(n)', 'In the worst case you check every element — linear O(n) search. Sort first to use O(log n) binary search.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'levels', 'mcq',
    'Advanced Data Structures #' || n || ': What is the time complexity of the heapify (build-heap) operation?',
    '["O(n log n)","O(n)","O(log n)","O(1)"]',
    'O(n)', 'Build-heap is O(n) — more efficient than inserting n elements one at a time which would be O(n log n).', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'sandbox', 'mcq',
    'DS Challenge #' || n || ': Which self-balancing BST rebalances using rotations to maintain O(log n) height?',
    '["Binary tree","AVL tree","B-tree","Heap"]',
    'AVL tree', 'AVL trees rebalance after insertions/deletions using single or double rotations to keep balance factor ∈ {-1, 0, 1}.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t3, n, 'sandbox', 'mcq',
    'Expert DS #' || n || ': A skip list achieves O(log n) average search by:',
    '["Sorting all elements","Maintaining multiple levels of linked lists with probabilistic forward pointers","Using a hash function","Balancing like an AVL tree"]',
    'Maintaining multiple levels of linked lists with probabilistic forward pointers', 'Skip lists layer linked lists with express lanes — each node is promoted with probability p, giving O(log n) search.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'story', 'mcq',
    'ARIA''s Learning Game #' || n || ': ARIA learns from pictures with labels saying "cat" or "dog". What type of learning is this?',
    '["Unsupervised","Supervised","Random","Loop learning"]',
    'Supervised', 'Supervised learning uses labelled data — each example has a known correct answer that teaches the model!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'story', 'mcq',
    'ARIA''s Expert Learning #' || n || ': ARIA learns WITHOUT any teacher giving correct answers. What type of learning is this?',
    '["Supervised learning","Unsupervised learning","Boolean learning","Looping"]',
    'Unsupervised learning', 'Unsupervised learning finds hidden patterns in unlabelled data — no teacher needed!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'levels', 'mcq',
    'ML Practice #' || n || ': What does reducing the learning rate do to model training?',
    '["Makes training faster","Makes it slower but more stable","Has no effect","Always causes overfitting"]',
    'Makes it slower but more stable', 'A lower learning rate takes smaller gradient steps — slower convergence but less risk of overshooting the minimum.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'levels', 'mcq',
    'Advanced ML #' || n || ': Which technique prevents overfitting by halting training when validation loss stops improving?',
    '["L2 regularisation","Dropout","Early stopping","Data augmentation"]',
    'Early stopping', 'Early stopping monitors validation loss and stops training when it plateaus or worsens — simple and effective.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'sandbox', 'mcq',
    'ML Deep Dive #' || n || ': What is the primary purpose of regularisation in ML?',
    '["Speed up training","Reduce overfitting by penalising model complexity","Increase accuracy on training data","Add more features to the model"]',
    'Reduce overfitting by penalising model complexity', 'Regularisation (L1/L2/dropout) adds a complexity penalty to the loss, discouraging the model from fitting noise.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'sandbox', 'mcq',
    'Expert ML #' || n || ': The VC dimension of a hypothesis class measures:',
    '["Training speed","The capacity/expressiveness — the largest set of points it can shatter","Model size in bytes","Dataset complexity"]',
    'The capacity/expressiveness — the largest set of points it can shatter', 'VC dimension quantifies how many points a model class can perfectly classify in all possible labellings (shattering).', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'story', 'mcq',
    'Brain Robot Challenge #' || n || ': Which layer of a neural network makes the FINAL decision or prediction?',
    '["Input layer","Hidden layer","Output layer","Error layer"]',
    'Output layer', 'The output layer produces the final answer — the result of all the processing done by the network!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'story', 'mcq',
    'ARIA''s Brain Expert #' || n || ': Deep learning uses networks with MANY hidden layers. What does this help the network learn?',
    '["Makes it simpler","Very complex patterns and features","Uses much less data","Always runs faster"]',
    'Very complex patterns and features', 'More layers = hierarchical feature learning. Early layers detect edges, later layers detect complex shapes and objects!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'levels', 'mcq',
    'Neural Network Drill #' || n || ': ReLU activation outputs negative inputs as:',
    '["-1","0","The same negative value","Infinity"]',
    '0', 'ReLU(x) = max(0, x). All negative inputs output 0 — this sparsity helps prevent vanishing gradients.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'levels', 'mcq',
    'Advanced Neural Networks #' || n || ': LSTMs were designed to solve which problem in standard RNNs?',
    '["Overfitting","Vanishing gradient — difficulty learning long-term dependencies","Slow training","Too many parameters"]',
    'Vanishing gradient — difficulty learning long-term dependencies', 'LSTMs use gate mechanisms (forget/input/output) to preserve long-range context that vanilla RNNs lose.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'sandbox', 'mcq',
    'Deep Learning Challenge #' || n || ': Exploding gradients during backpropagation are most commonly fixed by:',
    '["Increasing batch size","Gradient clipping — capping gradient norm to a threshold","Adding more layers","Removing dropout"]',
    'Gradient clipping — capping gradient norm to a threshold', 'Gradient clipping rescales gradients when their norm exceeds a threshold, preventing explosive weight updates in RNNs/deep nets.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'sandbox', 'mcq',
    'Expert Neural Networks #' || n || ': Neural Architecture Search (NAS) automates the design of:',
    '["Hyperparameters only (lr, batch size)","The network architecture itself — layers, connections, and operations","Training data pipelines","Inference hardware selection"]',
    'The network architecture itself — layers, connections, and operations', 'NAS uses RL, evolutionary algorithms, or differentiable search to find optimal architectures, replacing hand-design.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'story', 'mcq',
    'Language Robot Game #' || n || ': ARIA reads "I love this!" and says it is positive writing. What skill is this?',
    '["Machine translation","Tokenization","Sentiment analysis","Sorting"]',
    'Sentiment analysis', 'Sentiment analysis identifies positive, negative, or neutral feelings in text — a very useful NLP skill!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'story', 'mcq',
    'ARIA''s Language Expert #' || n || ': AI models like ChatGPT that understand and generate text are called:',
    '["Computer vision models","Large Language Models (LLMs)","Sorting robots","Calculators"]',
    'Large Language Models (LLMs)', 'LLMs like ChatGPT are trained on massive amounts of text to understand and generate human language!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'levels', 'mcq',
    'NLP Drill #' || n || ': Words that appear often in one document but rarely in the corpus score high in:',
    '["Tokenization score","TF-IDF","BERT embedding","Lemmatization score"]',
    'TF-IDF', 'TF-IDF rewards words that are locally frequent (TF) but globally rare (IDF) — capturing domain-specific terms.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'levels', 'mcq',
    'Advanced NLP #' || n || ': The "Attention Is All You Need" paper (2017) introduced which architecture?',
    '["LSTM","CNN for NLP","Transformer","BERT"]',
    'Transformer', 'Vaswani et al. replaced RNNs with pure self-attention in the Transformer — the foundation of all modern LLMs.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'sandbox', 'mcq',
    'NLP Advanced #' || n || ': Self-attention computational complexity per layer scales with sequence length as:',
    '["O(n)","O(n log n)","O(n²)","O(1)"]',
    'O(n²)', 'Self-attention computes all n×n pairwise token scores — quadratic in sequence length. This limits context window size.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'sandbox', 'mcq',
    'Expert NLP #' || n || ': In the scaled dot-product attention formula Q·Kᵀ/√d_k, what do Q, K, and V represent?',
    '["Quantities, Keys, Values — three lookup table types","Query, Key, Value — linear projections of the input used in the attention mechanism","Question, Knowledge, Vocabulary","Queue, Kernel, Vector"]',
    'Query, Key, Value — linear projections of the input used in the attention mechanism', 'Q queries for relevant content, K represents what each token contains, V is the content to aggregate based on attention scores.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'story', 'mcq',
    'ARIA''s Camera Quest #' || n || ': What is each tiny coloured square in a digital image called?',
    '["A dot","A pixel","A bit","A colour block"]',
    'A pixel', 'Images are made of pixels — each one stores a colour value. More pixels = higher resolution = sharper image!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'story', 'mcq',
    'ARIA''s Vision Expert #' || n || ': AI detecting whether someone is smiling uses which technology?',
    '["Sorting algorithms","Facial expression recognition using computer vision","Tokenization","Boolean logic"]',
    'Facial expression recognition using computer vision', 'Facial expression recognition trains CV models to classify emotions from facial muscle positions — amazing CV application!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'levels', 'mcq',
    'Vision Drill #' || n || ': A CNN kernel/filter detects features by:',
    '["Storing data in memory","Sliding over the input and computing dot products to detect local patterns","Classifying the whole image at once","Pooling features"]',
    'Sliding over the input and computing dot products to detect local patterns', 'Convolution slides the filter across the input. Where the filter matches the input pattern, the activation is high.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'levels', 'mcq',
    'Advanced Vision #' || n || ': Feature maps in a CNN represent:',
    '["Raw pixel values","Learned spatial features at different abstraction levels","Output class probabilities","Input image copies"]',
    'Learned spatial features at different abstraction levels', 'Each feature map is a filter''s response — early maps detect edges, later maps detect shapes, objects, and semantics.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'sandbox', 'mcq',
    'Vision Advanced #' || n || ': Residual (skip) connections in ResNets enable training very deep networks by:',
    '["Reducing the number of parameters","Adding the layer input directly to its output, creating shortcut gradient paths","Removing all activation functions","Using only pooling layers"]',
    'Adding the layer input directly to its output, creating shortcut gradient paths', 'H(x) = F(x) + x means ∂L/∂x receives gradients from both the main path and the shortcut — preventing vanishing gradients.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'sandbox', 'mcq',
    'Expert Vision #' || n || ': Self-attention in Vision Transformers (ViT) scales computationally with the number of patches as:',
    '["O(n)","O(n log n)","O(n²) — quadratic in patch count","O(1)"]',
    'O(n²) — quadratic in patch count', 'ViT self-attention is O(n²) in patch count. More/smaller patches greatly increases computation — a key ViT trade-off.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'story', 'mcq',
    'ARIA''s Kindness Challenge #' || n || ': A fair AI system should treat all people:',
    '["Differently based on gender","Fairly and equally regardless of background","Only adults fairly","Only people who paid"]',
    'Fairly and equally regardless of background', 'A fair AI treats everyone equitably — regardless of age, gender, race, or background. Fairness is a core AI ethics value!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'story', 'mcq',
    'ARIA''s Ethics Expert #' || n || ': An AI unfairly denying loans to people based on their background is an example of:',
    '["A useful sorting feature","AI bias causing real-world harm","A programming feature","A successful algorithm"]',
    'AI bias causing real-world harm', 'Biased AI in finance, hiring, or justice can cause serious real-world harm — a crucial reason to study AI ethics!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'levels', 'mcq',
    'Ethics Practice #' || n || ': Which AI ethics principle says AI decisions should be understandable and explainable?',
    '["Autonomy","Transparency","Speed","Data maximisation"]',
    'Transparency', 'Transparency ensures people can understand AI decisions — enabling accountability and fair challenges to automated choices.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'levels', 'mcq',
    'Advanced Ethics #' || n || ': GDPR Article 22 gives EU citizens the right to:',
    '["Free internet access","Know when automated decisions significantly affect them and request human review","Unlimited data storage","Turn off any AI system"]',
    'Know when automated decisions significantly affect them and request human review', 'Article 22 protects against fully automated high-stakes decisions — people have the right to human oversight.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'sandbox', 'mcq',
    'Ethics Deep Dive #' || n || ': SHAP (SHapley Additive exPlanations) values measure:',
    '["Model inference speed","Each feature''s marginal contribution to a specific prediction, based on cooperative game theory","Total training loss","Dataset feature count"]',
    'Each feature''s marginal contribution to a specific prediction, based on cooperative game theory', 'SHAP uses Shapley values to fairly attribute prediction contributions across all feature subsets — consistent and locally accurate.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'sandbox', 'mcq',
    'Expert Ethics #' || n || ': Group fairness and individual fairness are in tension because:',
    '["They use different programming languages","Statistical equalisation across groups may require treating similarly-situated individuals differently","One requires more data","They use different loss functions"]',
    'Statistical equalisation across groups may require treating similarly-situated individuals differently', 'This core impossibility in fairness theory means practitioners must consciously choose which fairness definition to optimise.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'story', 'mcq',
    'ARIA''s Robot World #' || n || ': A robot vacuum cleaner that cleans your floor by itself is an example of:',
    '["A video game","Automation at work","A sorting algorithm","A printer"]',
    'Automation at work', 'Automated robots perform tasks like vacuuming without human control — freeing people for more interesting work!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'story', 'mcq',
    'ARIA''s Expert Robot #' || n || ': A robot learns to walk by trying, falling, and getting a reward for balance. This is:',
    '["Supervised learning","Reinforcement learning","Boolean logic","Bubble Sort"]',
    'Reinforcement learning', 'Reinforcement learning trains robots through trial and reward — the robot learns to walk by maximising balance rewards!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'levels', 'mcq',
    'Robotics Practice #' || n || ': Which sensor measures distance by emitting sound pulses and measuring echo time?',
    '["Camera","LIDAR","Ultrasonic sensor","GPS"]',
    'Ultrasonic sensor', 'Ultrasonic sensors (like HC-SR04) emit 40kHz pulses and measure return time. d = (t × speed_of_sound) / 2.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'levels', 'mcq',
    'Advanced Robotics #' || n || ': Degrees of freedom (DoF) in a robot arm determines:',
    '["Battery consumption level","The number of independent axes of motion the arm can make","Sensor count on the arm","The weight capacity"]',
    'The number of independent axes of motion the arm can make', 'Each DoF is one independent movement axis. More DoF = more flexibility and dexterity for complex manipulation tasks.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'sandbox', 'mcq',
    'Robotics Advanced #' || n || ': In a PID controller, the Integral term specifically addresses:',
    '["Current position error","Rate of change of error","Accumulated past error — eliminating steady-state offset that P alone cannot fix","Predicted future error"]',
    'Accumulated past error — eliminating steady-state offset that P alone cannot fix', 'The I term sums error over time. Without it, a P-only controller maintains a steady-state offset. I term drives this to zero.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'sandbox', 'mcq',
    'Expert Robotics #' || n || ': Grasp planning must consider which three key factors for a stable grasp?',
    '["Speed, weight, and colour","Object geometry, friction coefficients, and force closure conditions","Battery level, sensor count, and speed","Weight, temperature, and material"]',
    'Object geometry, friction coefficients, and force closure conditions', 'A valid grasp requires contact points on the geometry that, with given friction, can resist all possible external disturbances.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'story', 'mcq',
    'ARIA Creates! #' || n || ': When AI writes a new story from your description, it is using:',
    '["Sorting algorithms","Generative AI","Boolean logic only","A calculator"]',
    'Generative AI', 'Generative AI creates brand-new content — stories, art, music — based on patterns learned from human creations!', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'story', 'mcq',
    'ARIA''s GenAI Expert #' || n || ': What should you ALWAYS check when AI gives you information?',
    '["Nothing — AI is always right","Whether it is accurate and truthful","Only the grammar","The font used"]',
    'Whether it is accurate and truthful', 'AI can hallucinate false facts confidently — always verify important information with reliable, trusted sources!', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'levels', 'mcq',
    'GenAI Practice #' || n || ': "Few-shot prompting" means:',
    '["Training the model on very few examples","Providing a few input-output examples in the prompt to show the model the desired format","Using a smaller model","Lowering the temperature setting"]',
    'Providing a few input-output examples in the prompt to show the model the desired format', 'Few-shot prompting includes example pairs in the context — the model infers the task pattern without any weight updates.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'levels', 'mcq',
    'Advanced GenAI #' || n || ': "Top-p" (nucleus) sampling restricts token selection to:',
    '["The single highest probability token","The top p tokens by count","Tokens whose cumulative probability reaches p — balancing diversity and quality","All tokens equally"]',
    'Tokens whose cumulative probability reaches p — balancing diversity and quality', 'Top-p only samples from the smallest token set whose cumulative probability ≥ p — avoiding both boring and nonsensical outputs.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'sandbox', 'mcq',
    'GenAI Advanced #' || n || ': What problem does Flash Attention solve in Transformer training?',
    '["Weight initialisation","O(n²) memory footprint of standard attention by using IO-aware tiling on GPU SRAM","Gradient vanishing in deep networks","Tokenization vocabulary size"]',
    'O(n²) memory footprint of standard attention by using IO-aware tiling on GPU SRAM', 'Flash Attention computes exact attention in O(n) memory by tiling the Q·Kᵀ computation — enabling much longer context windows.', true
  from generate_series(56, 100) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'sandbox', 'mcq',
    'Expert GenAI #' || n || ': "Emergence" in large language models refers to:',
    '["Improved inference speed at scale","Capabilities that appear only above a certain scale threshold — not predictable from smaller model behaviour","Reduced hallucinations at scale","Faster tokenization"]',
    'Capabilities that appear only above a certain scale threshold — not predictable from smaller model behaviour', 'Emergent abilities (reasoning, code, multi-step arithmetic) appear suddenly at certain parameter counts — a key open research question.', false
  from generate_series(101, 110) as n
  on conflict (topic_id, order_index, track) do nothing;
end;
$$;
