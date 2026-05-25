// Rich lesson content for all 10 topics.
// Each lesson has: hook, intro, 4 sections, fun fact, untracked quick-check, and 5 T/F questions.

export type LessonSection = {
  heading: string
  body: string          // paragraphs separated by \n\n
  callout?: string      // highlighted insight box
}

export type QuickCheck = {
  question: string
  options: string[]
  answer: string        // must match one option exactly
  explanation: string
}

export type TrueFalse = {
  statement: string
  answer: boolean
  explanation: string
}

export type TopicLesson = {
  hook: string
  intro: string
  sections: LessonSection[]
  funFact: string
  quickCheck: QuickCheck
  trueOrFalse: TrueFalse[]
}

export const LESSON_CONTENT: Record<string, TopicLesson> = {

  'Logic & Boolean Algebra': {
    hook: 'Every decision your computer makes comes down to a single choice: yes or no.',
    intro: 'Computers are powerful yet simple — they only understand two values: 0 (false) and 1 (true). Boolean algebra, invented by mathematician George Boole in 1847, gives us the rules for combining these values to make any decision. It is the mathematical foundation underneath every app, game, and AI system you use.',
    sections: [
      {
        heading: 'Why computers only use 0 and 1',
        body: 'The secret lies in electricity. A transistor — a tiny electronic switch — is either ON (1) or OFF (0). Modern chips pack billions of these switches onto a sliver of silicon smaller than your fingernail.\n\nBy cleverly combining these switches, we can represent any number, letter, colour, or instruction. Every word you read on screen, every photo you scroll past, is ultimately a pattern of 0s and 1s flowing through billions of switches at the speed of light.',
        callout: 'A transistor on a modern chip is smaller than a coronavirus particle!',
      },
      {
        heading: 'The three logic operations: AND, OR, NOT',
        body: '• AND – output is 1 only when BOTH inputs are 1. Like a vault that needs two keys simultaneously.\n\n• OR – output is 1 when AT LEAST ONE input is 1. Like an alarm that triggers from motion OR sound.\n\n• NOT – flips the value entirely. NOT 1 = 0, NOT 0 = 1. Like a toggle switch.',
        callout: 'These three operations are enough to build any computation. Everything else is combinations of AND, OR, and NOT.',
      },
      {
        heading: 'Truth tables: mapping every possibility',
        body: 'A truth table lists every possible combination of inputs alongside the output. They work like multiplication tables, but for logic. Engineers use them to design and verify circuits on paper before building a single physical component.\n\nFor AND with inputs A and B, there are four possible rows: (0,0)→0, (0,1)→0, (1,0)→0, (1,1)→1. Only one row gives a 1.',
      },
      {
        heading: 'Boolean logic in your daily life',
        body: 'You encounter Boolean logic constantly without noticing:\n\n• Passwords: must be 8+ characters AND contain a number AND a capital letter.\n• Fire alarm: triggers if smoke OR heat is detected.\n• Parental controls: block content if age rating is 18+ AND child mode is active.\n\nSearch engines rely on it too — searching "cats AND dogs" finds only pages mentioning both.',
      },
    ],
    funFact: 'The first computer "bug" was a real moth! In 1947, engineers found a moth trapped inside a Harvard computer\'s relay. They taped it in the logbook with the note: "First actual case of bug being found."',
    quickCheck: {
      question: 'A security alarm triggers only if the door is open AND the alarm is armed. The door is open (1), but the alarm is disarmed (0). What happens?',
      options: ['Alarm triggers — output is 1', 'Alarm stays silent — output is 0', 'It depends on the door model', 'The system resets'],
      answer: 'Alarm stays silent — output is 0',
      explanation: 'AND requires BOTH inputs to be 1. Open door (1) AND disarmed alarm (0) = 0. The alarm stays silent because both conditions are not met.',
    },
    trueOrFalse: [
      { statement: 'AND outputs 1 when at least one input is 1', answer: false, explanation: 'That describes OR. AND outputs 1 only when BOTH inputs are 1.' },
      { statement: 'NOT 0 equals 1', answer: true, explanation: 'NOT flips the value. NOT 0 = 1, and NOT 1 = 0.' },
      { statement: 'George Boole invented Boolean algebra before computers existed', answer: true, explanation: 'Boole published his algebra in 1847 — almost 100 years before the first electronic computers in the 1940s.' },
      { statement: 'OR gives 0 only when both inputs are 0', answer: true, explanation: 'OR is true whenever at least one input is 1. The only case it outputs 0 is when both inputs are 0.' },
      { statement: 'Modern chips contain only a few hundred transistors', answer: false, explanation: 'Modern chips contain billions of transistors. Apple\'s M-series chips have over 100 billion!' },
    ],
  },

  'Algorithmic Thinking': {
    hook: 'When you follow a recipe or give someone directions, you are already thinking algorithmically.',
    intro: 'An algorithm is a precise, step-by-step set of instructions for solving a problem or achieving a goal. Algorithms are the heart of all software — without them, computers are just expensive paperweights. Learning to think algorithmically means breaking any problem into clear, logical steps.',
    sections: [
      {
        heading: 'What makes something an algorithm?',
        body: 'A good algorithm has four key properties:\n\n• Input — it takes in some data or starting values.\n• Output — it produces a result.\n• Definiteness — every step is clear and unambiguous.\n• Finiteness — it terminates after a finite number of steps.\n\nA recipe is a great everyday example: take ingredients (input), follow clear steps (definiteness), produce a meal (output), and finish when the dish is done (finiteness).',
        callout: 'Algorithms existed long before computers. Ancient Babylonian clay tablets from 1800 BCE contain mathematical algorithms for solving equations!',
      },
      {
        heading: 'The three building blocks',
        body: 'Every algorithm is built from three control structures:\n\n• Sequence — steps executed in a fixed order (stir the batter, then pour it, then bake it).\n• Selection — choosing different paths based on a condition — IF/ELSE (IF the cake is brown THEN take it out, ELSE leave it in).\n• Iteration — repeating steps until a condition is met (WHILE the batter is lumpy, keep stirring).\n\nUsing just these three structures, you can express any algorithm in the world.',
      },
      {
        heading: 'Efficiency: not all algorithms are equal',
        body: 'Two algorithms can solve the same problem but one can be thousands of times faster. Imagine finding a name in a phone book. You could check every single entry from page 1 — that could be 500,000 checks! Or you could open the middle, decide which half the name is in, and repeat — that takes only about 20 steps. This second approach is called binary search.\n\nAlgorithm efficiency matters enormously when working with big data.',
        callout: 'Google processes over 8.5 billion searches per day. Without efficient algorithms, each search would take hours instead of milliseconds.',
      },
      {
        heading: 'Algorithms everywhere',
        body: 'Algorithms run every aspect of modern life:\n\n• GPS navigation calculates the shortest route through millions of possible paths.\n• Streaming services decide what to recommend next based on your history.\n• Hospital systems prioritise patients in emergency rooms.\n• Social media feeds are sorted by engagement algorithms.\n\nLearning to design good algorithms is one of the most valuable skills in the 21st century.',
      },
    ],
    funFact: 'The word "algorithm" comes from the name of a 9th-century Persian mathematician: Muhammad ibn Musa al-Khwarizmi. His book on arithmetic introduced decimal numbers to Europe.',
    quickCheck: {
      question: 'Which of the following best describes a LOOP (iteration) in an algorithm?',
      options: ['Doing steps in a fixed order', 'Choosing different steps based on a condition', 'Repeating steps until a goal is met', 'Stopping the algorithm early'],
      answer: 'Repeating steps until a goal is met',
      explanation: 'Iteration (a loop) means repeating a set of steps while a condition is true. For example: WHILE there are more items, process the next one.',
    },
    trueOrFalse: [
      { statement: 'An algorithm must always have exactly five steps', answer: false, explanation: 'An algorithm can have any number of steps. It just needs to be finite and produce an output.' },
      { statement: 'Searching through every item one by one is always the fastest algorithm', answer: false, explanation: 'Linear search is often the slowest approach. Binary search, for example, is dramatically faster for sorted data.' },
      { statement: 'Sequence, selection, and iteration can be combined to express any algorithm', answer: true, explanation: 'These three control structures are all you need to write any program — a principle called structured programming.' },
      { statement: 'The word "algorithm" comes from a mathematician\'s name', answer: true, explanation: 'It derives from al-Khwarizmi, a 9th-century Persian mathematician whose work shaped modern mathematics.' },
      { statement: 'GPS uses algorithms to find optimal routes', answer: true, explanation: 'GPS apps use pathfinding algorithms like Dijkstra\'s or A* to calculate the best route through road networks.' },
    ],
  },

  'Data Structures': {
    hook: 'Imagine trying to find a book in a library where books are piled randomly on the floor. Data structures are how we avoid that chaos.',
    intro: 'A data structure is a way of organising and storing data so it can be accessed and modified efficiently. Choosing the right data structure for the job is one of the most important skills in programming — the wrong choice can make an application hundreds of times slower than it needs to be.',
    sections: [
      {
        heading: 'Arrays: the simplest structure',
        body: 'An array stores items in a fixed, ordered sequence. Each item has an index — a number indicating its position, starting from 0. You can jump directly to any item by its index in one step, making it extremely fast for lookups.\n\nHowever, inserting or deleting items in the middle of an array is slow, because you must shift everything else along to fill the gap.',
        callout: 'Most programming languages use 0-based indexing. So the first element is always at index [0], not [1]!',
      },
      {
        heading: 'Stacks and queues: organised access',
        body: 'A stack is Last-In, First-Out (LIFO) — like a pile of plates. You always add and remove from the top. Your browser\'s Back button uses a stack: each page you visit is pushed on top; clicking Back pops the most recent one.\n\nA queue is First-In, First-Out (FIFO) — like a checkout line. The first item added is the first one removed. Printer queues, messaging apps, and load balancers all use this structure.',
      },
      {
        heading: 'Trees: hierarchical data',
        body: 'A tree organises data hierarchically. Each tree has a root node at the top. Every node can have child nodes below it, and leaf nodes have no children.\n\nYour computer\'s file system is a tree: one root folder contains subfolders, which contain more subfolders, down to individual files. A binary search tree is special: every left child is smaller than its parent, and every right child is larger, enabling blazingly fast search.',
        callout: 'Databases store billions of records in a structure called a B-tree, allowing lookups in milliseconds even across petabytes of data.',
      },
      {
        heading: 'Choosing the right structure',
        body: 'Different structures shine in different situations:\n\n• Need random access by position? → Array\n• Need fast insertion and deletion at both ends? → Linked list or deque\n• Need undo/redo functionality? → Stack\n• Need fair turn-taking? → Queue\n• Need fast search, insert, and delete? → Binary search tree or hash table\n\nProfessional engineers spend a great deal of time thinking about data structure choice before writing a single line of code.',
      },
    ],
    funFact: 'The internet itself relies on tree structures. DNS (Domain Name System), which converts domain names like "google.com" into IP addresses, is organised as a massive distributed tree with billions of nodes.',
    quickCheck: {
      question: 'Your browser\'s Back button takes you to the previous page you visited. Which data structure best models this behaviour?',
      options: ['Array', 'Queue (FIFO)', 'Stack (LIFO)', 'Binary tree'],
      answer: 'Stack (LIFO)',
      explanation: 'Each page you visit is "pushed" onto a stack. Clicking Back "pops" the most recent page — the last one in is the first one out. That is exactly LIFO behaviour.',
    },
    trueOrFalse: [
      { statement: 'An array allows you to access any element in one step using its index', answer: true, explanation: 'Arrays offer O(1) random access — jumping to any index takes a constant amount of time regardless of array size.' },
      { statement: 'A queue is Last-In, First-Out', answer: false, explanation: 'A queue is First-In, First-Out (FIFO). A stack is Last-In, First-Out (LIFO).' },
      { statement: 'A binary search tree always has exactly two children per node', answer: false, explanation: 'In a BST, each node can have 0, 1, or 2 children. "Binary" means at most two, not exactly two.' },
      { statement: 'Your computer\'s file system is organised as a tree', answer: true, explanation: 'File systems use a hierarchical tree structure with a root directory and nested subdirectories.' },
      { statement: 'Choosing a poor data structure can make a program much slower', answer: true, explanation: 'The wrong data structure can change an operation from milliseconds to hours. Data structure choice is critical for performance.' },
    ],
  },

  'Machine Learning Basics': {
    hook: 'How does Netflix know exactly what you want to watch next? The answer is machine learning.',
    intro: 'Machine learning (ML) is a branch of AI where systems learn from data, rather than being explicitly programmed with rules. Instead of a programmer writing "if the email contains the word \'free\' then mark as spam," an ML model learns patterns from thousands of spam and non-spam examples and figures out the rules on its own.',
    sections: [
      {
        heading: 'Traditional programming vs machine learning',
        body: 'In traditional programming, humans write the rules: IF condition THEN action. This works for simple problems but breaks down for complex ones — you cannot manually write rules for "recognise a face" or "translate French to English".\n\nIn machine learning, you provide examples (data) and desired outputs (labels), and the algorithm discovers the rules automatically. The rules live inside the model as millions of numbers called weights.',
        callout: 'A spam filter trained on millions of emails will catch new spam it has never seen before, because it learns patterns — not just specific words.',
      },
      {
        heading: 'Training: how models learn',
        body: 'Training is the process of feeding labelled examples to a learning algorithm. The algorithm makes predictions, compares them to the correct answers, measures the error, and adjusts its weights to reduce that error. This cycle repeats thousands or millions of times.\n\nImagine teaching a child to recognise dogs. You show them many examples, saying "dog" or "not dog." Over time they learn the pattern without you ever explaining exactly what makes something a dog.',
      },
      {
        heading: 'Three types of machine learning',
        body: '• Supervised learning — training on labelled data (example: classifying emails as spam or not spam). Most common type.\n\n• Unsupervised learning — finding hidden patterns in unlabelled data (example: grouping customers by shopping behaviour without pre-defined categories).\n\n• Reinforcement learning — learning by trial and error with rewards and penalties (example: an AI learning to play chess by playing millions of games against itself).',
        callout: 'AlphaGo defeated the world champion Go player in 2016 using reinforcement learning — a task previously thought to be decades away.',
      },
      {
        heading: 'When ML goes wrong: overfitting',
        body: 'Overfitting happens when a model memorises the training data instead of learning general patterns. It performs brilliantly on data it has seen, but fails on new data.\n\nThink of a student who memorises the exact questions from past exam papers but cannot answer anything slightly different. To prevent overfitting, engineers use techniques like regularisation, dropout, and validation sets to ensure models generalise well to new situations.',
      },
    ],
    funFact: 'Spam filters are one of the oldest machine learning applications — Paul Graham published a famous essay on Bayesian spam filtering in 2002, which sparked a revolution in how email was managed.',
    quickCheck: {
      question: 'A model performs perfectly on its training data but poorly on new data. What is this problem called?',
      options: ['Underfitting', 'Overfitting', 'Regularisation', 'Labelling error'],
      answer: 'Overfitting',
      explanation: 'Overfitting means the model memorised training data rather than learning general patterns. It is like a student who memorises answers but cannot apply knowledge to new questions.',
    },
    trueOrFalse: [
      { statement: 'In machine learning, a programmer writes all the rules explicitly', answer: false, explanation: 'ML models learn rules from data automatically. This is the key difference from traditional programming.' },
      { statement: 'Supervised learning requires labelled training data', answer: true, explanation: 'In supervised learning, each training example has a label — the correct answer the model should learn to predict.' },
      { statement: 'Overfitting makes a model better at generalising to new data', answer: false, explanation: 'Overfitting makes a model worse at generalising. It performs well on training data but poorly on unseen data.' },
      { statement: 'Reinforcement learning involves learning through rewards and penalties', answer: true, explanation: 'Reinforcement learning agents learn by receiving positive rewards for good actions and negative rewards for bad ones.' },
      { statement: 'A machine learning model stores its knowledge as weights — numerical values', answer: true, explanation: 'ML models encode everything they learn in numerical parameters called weights or parameters.' },
    ],
  },

  'Neural Networks': {
    hook: 'Your brain has 86 billion neurons connected by 100 trillion synapses. Artificial neural networks try to borrow this idea.',
    intro: 'Artificial neural networks (ANNs) are computing systems loosely inspired by the biological neural networks that make up animal brains. They are the engine behind image recognition, voice assistants, translation, and modern AI. By stacking many simple computing units together, they can learn extraordinarily complex patterns.',
    sections: [
      {
        heading: 'The artificial neuron',
        body: 'A single artificial neuron works simply: it takes several numerical inputs, multiplies each by a weight (its importance), adds them up, applies a mathematical function called an activation function, and produces one output.\n\nIf the combined input is strong enough — above a threshold — the neuron "fires" and passes a signal forward, much like a biological neuron transmitting an electrical impulse.',
        callout: 'A single neuron is not intelligent. Intelligence emerges from thousands or millions of neurons working together and training on data.',
      },
      {
        heading: 'Layers: the architecture of learning',
        body: 'Neurons are organised into layers:\n\n• Input layer — receives raw data (e.g., pixel values of an image).\n• Hidden layers — intermediate layers that learn progressively abstract features.\n• Output layer — produces the final prediction (e.g., "cat" or "dog").\n\nEarly hidden layers detect simple features like edges and colours. Deeper layers detect complex features like eyes, ears, and full objects. This is called hierarchical feature learning.',
      },
      {
        heading: 'Training: backpropagation',
        body: 'Neural networks learn through a process called backpropagation. After making a prediction, the network calculates the error. It then works backwards through the layers, adjusting each weight slightly to reduce that error.\n\nThis is repeated millions of times using an optimisation algorithm called gradient descent. Imagine rolling a ball down a hilly landscape, always moving in the direction of steepest descent until reaching the lowest point — minimum error.',
        callout: 'GPT-4, the language model behind ChatGPT, has an estimated 1.76 trillion parameters (weights). Training it cost over $100 million in computing power.',
      },
      {
        heading: 'Deep learning: going deeper',
        body: 'Deep learning refers to neural networks with many hidden layers — sometimes hundreds. These deep networks can learn incredibly complex representations from raw data.\n\nConvolutional Neural Networks (CNNs) are specialised for images. Recurrent Neural Networks (RNNs) handle sequences like text. Transformers — the technology behind ChatGPT — use attention mechanisms to process language with remarkable understanding.',
      },
    ],
    funFact: 'The human brain processes visual information through roughly 30 distinct visual areas. A deep learning image classifier replicates a similar hierarchy: edges → shapes → parts → objects, each in a separate layer.',
    quickCheck: {
      question: 'In a neural network, what does the "hidden layer" do?',
      options: [
        'It stores the training data',
        'It receives the raw input',
        'It learns intermediate patterns and features between input and output',
        'It produces the final prediction',
      ],
      answer: 'It learns intermediate patterns and features between input and output',
      explanation: 'Hidden layers transform the input into increasingly abstract representations. Early layers detect simple features; deeper layers detect complex concepts.',
    },
    trueOrFalse: [
      { statement: 'A neural network with only one neuron can learn any pattern', answer: false, explanation: 'A single neuron can only learn linear boundaries. Complex patterns require many neurons organised in layers.' },
      { statement: 'Backpropagation adjusts weights to reduce prediction error', answer: true, explanation: 'Backpropagation computes how much each weight contributed to the error and adjusts it accordingly.' },
      { statement: 'Deep learning uses networks with many hidden layers', answer: true, explanation: 'Deep learning is defined by networks with many (deep) layers, enabling complex hierarchical learning.' },
      { statement: 'The output layer receives raw input data like pixel values', answer: false, explanation: 'The input layer receives raw data. The output layer produces the final prediction.' },
      { statement: 'Gradient descent helps find the set of weights that minimises error', answer: true, explanation: 'Gradient descent iteratively adjusts weights in the direction that reduces error, eventually converging on a good solution.' },
    ],
  },

  'Natural Language Processing': {
    hook: 'Siri, Alexa, Google Translate, and ChatGPT all rely on the same technology to understand your words.',
    intro: 'Natural Language Processing (NLP) is the field of AI that deals with the interaction between computers and human language. It is one of the hardest problems in AI — language is ambiguous, context-dependent, and constantly evolving. Modern NLP systems can translate languages, answer questions, summarise documents, and generate human-like text.',
    sections: [
      {
        heading: 'Why language is hard for computers',
        body: 'Language is packed with ambiguity. "I saw a man on a hill with a telescope" — did you use the telescope, or did the man have it? "Bank" means a riverbank or a financial institution depending on context. Sarcasm, idioms, and cultural references add more layers of complexity.\n\nHumans resolve these ambiguities effortlessly using world knowledge and context. Teaching machines to do the same has been the central challenge of NLP for decades.',
        callout: 'There are approximately 7,000 living languages in the world. NLP researchers are working to build systems that work across all of them.',
      },
      {
        heading: 'Tokenisation and embeddings',
        body: 'Before a model can process text, it must break it into manageable pieces. Tokenisation splits text into words or sub-word units called tokens. "Unhappy" might become ["un", "happy"] or remain as a single token depending on the model.\n\nTokens are then converted into embeddings — lists of numbers that capture meaning. Crucially, similar words end up as similar numbers. In embedding space, "king − man + woman ≈ queen." The geometry encodes semantic relationships.',
      },
      {
        heading: 'Transformers: the architecture that changed everything',
        body: 'In 2017, Google introduced the Transformer architecture. Its key innovation is the attention mechanism, which lets the model focus on the most relevant words when processing each word in a sentence.\n\nProcessing "The trophy didn\'t fit in the suitcase because it was too big" requires knowing "it" refers to "trophy" — attention can learn this. Transformers process all words simultaneously (not one at a time), enabling massive parallelism and making huge models feasible.',
        callout: 'GPT (Generative Pre-trained Transformer) is based on this architecture. ChatGPT\'s impressive abilities come from training a Transformer on hundreds of billions of words.',
      },
      {
        heading: 'NLP in everyday applications',
        body: 'NLP powers many tools you use daily:\n\n• Machine translation (Google Translate, DeepL) — translating text between 100+ languages.\n• Virtual assistants (Siri, Alexa) — understanding spoken commands.\n• Search engines — understanding the intent behind your query.\n• Email — spam filtering, smart reply, autocomplete.\n• Healthcare — extracting information from medical records automatically.\n\nModern large language models like GPT-4 and Claude can write code, explain concepts, draft legal documents, and hold nuanced conversations.',
      },
    ],
    funFact: 'The Transformer paper "Attention Is All You Need" (Google, 2017) has been cited over 100,000 times — making it one of the most influential academic papers in computing history.',
    quickCheck: {
      question: 'What does tokenisation do in NLP?',
      options: [
        'It translates text from one language to another',
        'It breaks text into smaller pieces (tokens) that a model can process',
        'It assigns sentiment scores to sentences',
        'It removes punctuation from text',
      ],
      answer: 'It breaks text into smaller pieces (tokens) that a model can process',
      explanation: 'Tokenisation is the first step in NLP — splitting text into manageable units. These tokens are then converted into numerical embeddings that the model can work with.',
    },
    trueOrFalse: [
      { statement: 'Language is easy for computers because words have fixed, single meanings', answer: false, explanation: 'Language is notoriously ambiguous. Words have multiple meanings depending on context, making NLP very challenging.' },
      { statement: 'Word embeddings represent words as lists of numbers', answer: true, explanation: 'Embeddings convert words into numerical vectors that capture semantic relationships, enabling mathematical operations on meaning.' },
      { statement: 'The Transformer architecture processes words one at a time, in order', answer: false, explanation: 'Transformers process all words in parallel, which is one reason they are so much faster than earlier sequence models.' },
      { statement: 'Google Translate uses NLP to translate between languages', answer: true, explanation: 'Modern translation systems use neural machine translation, a form of NLP, to translate across 100+ languages.' },
      { statement: 'The attention mechanism helps a model focus on relevant parts of a sentence', answer: true, explanation: 'Attention allows the model to weigh the importance of different words when processing each position, capturing long-range dependencies.' },
    ],
  },

  'Computer Vision': {
    hook: 'A baby learns to recognise faces in weeks. Teaching a computer to do the same took decades of research.',
    intro: 'Computer vision is the field of AI that enables machines to interpret and understand visual information — images and videos — the way humans do. It powers self-driving cars, medical diagnostics, facial recognition, augmented reality, and much more. Today\'s systems can outperform humans at certain visual tasks.',
    sections: [
      {
        heading: 'How images are represented',
        body: 'A digital image is a grid of tiny coloured squares called pixels. Each pixel stores three numbers — representing the intensity of Red, Green, and Blue light (0–255 each). A 1080p photo contains over 2 million pixels and more than 6 million numbers.\n\nFor a computer, processing an image means processing this huge grid of numbers and extracting meaningful patterns. That is the challenge computer vision solves.',
        callout: 'The human eye has about 120 million light-sensitive cells. A 12-megapixel camera sensor has 12 million pixels — impressive, but still less dense than our eyes.',
      },
      {
        heading: 'Convolutional Neural Networks (CNNs)',
        body: 'CNNs are the deep learning architecture designed for images. Instead of connecting every neuron to every pixel (which would be billions of connections), CNNs use filters — small grids that slide across the image detecting local features.\n\nEarly filters detect edges and colour gradients. Later filters combine these into shapes, then into object parts like eyes or wheels, then into full objects. This hierarchical feature detection mirrors how the human visual cortex works.',
      },
      {
        heading: 'Key computer vision tasks',
        body: '• Image classification — labelling the entire image ("this is a cat").\n• Object detection — finding and labelling every object in an image with a bounding box ("there is a cat at position X, a dog at position Y").\n• Semantic segmentation — labelling every single pixel (used in self-driving cars to identify road, pavement, pedestrians).\n• Facial recognition — identifying specific individuals from their facial features.\n\nEach task requires progressively more detailed understanding of the image.',
        callout: 'Self-driving cars process video from up to 20 cameras simultaneously, running computer vision algorithms hundreds of times per second.',
      },
      {
        heading: 'Challenges and ethics',
        body: 'Computer vision systems can fail in surprising ways. Small stickers on a stop sign have fooled self-driving car cameras. Facial recognition systems perform significantly worse on darker skin tones if trained on unrepresentative data.\n\nThese failures have real consequences — from safety risks to discriminatory policing. Responsible computer vision engineering requires diverse training data, rigorous testing across demographics, and careful consideration of the deployment context.',
      },
    ],
    funFact: 'In 2012, a deep learning system called AlexNet slashed the image recognition error rate by half in a single year — a breakthrough so dramatic it convinced the entire AI research community to switch to deep learning overnight.',
    quickCheck: {
      question: 'What does "object detection" do that basic image classification does not?',
      options: [
        'It only tells you what the dominant colour of an image is',
        'It labels the whole image with one category',
        'It finds and locates every object in an image with bounding boxes',
        'It converts images into audio descriptions',
      ],
      answer: 'It finds and locates every object in an image with bounding boxes',
      explanation: 'Classification gives one label for the whole image. Object detection goes further — it finds every object and draws a box around each one, labelling them individually.',
    },
    trueOrFalse: [
      { statement: 'A digital image is stored as a grid of pixels, each with colour values', answer: true, explanation: 'Images are represented as grids of pixels. Each pixel stores RGB values (0–255 for Red, Green, Blue).' },
      { statement: 'CNNs process all pixels equally, with no awareness of location', answer: false, explanation: 'CNNs use sliding filters that are spatially aware, detecting local features at specific positions in the image.' },
      { statement: 'Facial recognition systems always perform equally well regardless of skin tone', answer: false, explanation: 'Studies have shown many facial recognition systems perform worse on darker skin tones, often due to biased training data.' },
      { statement: 'AlexNet\'s 2012 result convinced researchers to adopt deep learning for computer vision', answer: true, explanation: 'AlexNet\'s dramatic improvement in image recognition accuracy was a pivotal moment that shifted the entire field to deep learning.' },
      { statement: 'Self-driving cars use computer vision to understand their surroundings', answer: true, explanation: 'Self-driving cars rely heavily on computer vision from cameras (plus lidar and radar) to detect objects, lanes, and signs.' },
    ],
  },

  'Data Ethics & Privacy': {
    hook: 'Your phone knows your location, your interests, your daily routine — and possibly more about you than your closest friends.',
    intro: 'As AI systems become more powerful and data more abundant, the ethical questions around how data is collected, used, and protected become critical. Data ethics examines what is right and fair when handling personal information, building AI models, and deploying systems that make decisions affecting people\'s lives.',
    sections: [
      {
        heading: 'What data is collected and why it matters',
        body: 'The average person generates 1.7 megabytes of data per second through their digital activities. Apps track your location, apps log your searches, websites record every click. This data is incredibly valuable — it helps train AI models, target advertisements, and optimise services.\n\nBut data is also personal. It reveals your health, your finances, your relationships, your beliefs. In the wrong hands, or used without consent, it can be weaponised for discrimination, manipulation, or surveillance.',
        callout: 'In 2018, it was revealed that Cambridge Analytica harvested the Facebook data of 87 million users without their knowledge to build political influence profiles.',
      },
      {
        heading: 'Consent and data rights',
        body: 'Ethical data use starts with informed consent — people should know what data is collected, how it is used, and who it is shared with, before they agree to it. The EU\'s General Data Protection Regulation (GDPR) enshrined several data rights into law:\n\n• Right to access — you can request all data a company holds about you.\n• Right to erasure ("right to be forgotten") — you can request deletion.\n• Right to portability — you can take your data elsewhere.\n• Right to object — you can refuse certain uses of your data.',
      },
      {
        heading: 'Algorithmic bias',
        body: 'AI systems trained on biased data learn biased patterns. A hiring algorithm trained on historical data may learn that men are more suitable for leadership roles — because historically most leaders were men. A facial recognition system trained mostly on lighter-skinned faces will perform worse on darker faces.\n\nBias in AI has led to wrongful arrests, unfair loan denials, and discriminatory job screening. Identifying and mitigating bias requires diverse training data, careful metric design, and ongoing monitoring after deployment.',
        callout: 'In 2018, Amazon scrapped an internal AI recruiting tool after discovering it systematically penalised CVs that included the word "women\'s" (e.g., "women\'s chess club").',
      },
      {
        heading: 'Building ethical AI',
        body: 'Organisations like the EU AI Act, the OECD, and Amnesty International have developed AI ethics frameworks. Key principles include:\n\n• Transparency — people affected by AI decisions should be able to understand why.\n• Accountability — someone must be responsible when AI causes harm.\n• Fairness — AI should not discriminate based on protected characteristics.\n• Privacy by design — privacy protections should be built in from the start, not bolted on.\n\nEthics is not a checklist — it requires ongoing critical thinking and stakeholder engagement.',
      },
    ],
    funFact: 'The GDPR fines can reach €20 million or 4% of global annual turnover — whichever is higher. Meta has been fined over €1.3 billion under GDPR for transferring European user data to the United States.',
    quickCheck: {
      question: 'A recruitment AI trained on 10 years of historical hiring decisions consistently rejects female applicants for senior roles. What is the most likely cause?',
      options: [
        'The algorithm is designed to be discriminatory',
        'Women are genuinely less qualified for senior roles',
        'The AI learned bias from historical data that reflected past discrimination',
        'The AI has a software bug that needs patching',
      ],
      answer: 'The AI learned bias from historical data that reflected past discrimination',
      explanation: 'If historical hiring was biased (fewer women in senior roles), the AI learns this pattern as if it were correct. The data reflects past discrimination, not actual merit differences.',
    },
    trueOrFalse: [
      { statement: 'GDPR gives EU citizens the right to request deletion of their personal data', answer: true, explanation: 'The "right to erasure" (Article 17) allows individuals to request that their data be deleted under certain conditions.' },
      { statement: 'Algorithmic bias only occurs when programmers intentionally write discriminatory code', answer: false, explanation: 'Bias usually emerges unintentionally from biased training data or flawed problem formulation — not malicious intent.' },
      { statement: 'Data ethics only matters to very large companies', answer: false, explanation: 'Data ethics applies to anyone collecting or using personal data, from startups to individuals building personal projects.' },
      { statement: 'AI transparency means people should be able to understand decisions that affect them', answer: true, explanation: 'Transparency is a core AI ethics principle — people deserve explanations for consequential automated decisions.' },
      { statement: 'Collecting more data always improves AI fairness', answer: false, explanation: 'More data is only helpful if it is diverse and representative. More biased data just amplifies the bias.' },
    ],
  },

  'Robotics & Automation': {
    hook: 'There are over 4 million industrial robots working in factories right now — and the number is growing by 15% every year.',
    intro: 'Robotics is the field that designs, builds, and programs machines that can sense, think, and act in the physical world. Combined with AI, robots can now perform tasks that require perception, decision-making, and physical dexterity. From surgery to space exploration, robotics is reshaping how we work and live.',
    sections: [
      {
        heading: 'What makes something a robot?',
        body: 'A robot typically has three core components:\n\n• Sensors — devices that let the robot perceive its environment (cameras, lidar, force sensors, microphones, GPS).\n• Processing unit — a computer (sometimes with AI) that makes decisions based on sensor data.\n• Actuators — the motors, servos, and hydraulics that make the robot move and interact with the world.\n\nPut simply: robots sense, decide, and act. This is called the Sense-Plan-Act cycle.',
        callout: 'The Mars Rover Perseverance uses a combination of stereo cameras, lidar, and an onboard AI to drive autonomously across the Martian surface without real-time commands from Earth.',
      },
      {
        heading: 'The Sense-Plan-Act cycle',
        body: 'The Sense-Plan-Act loop is the foundation of robotic control:\n\n1. Sense — gather data from the environment using sensors.\n2. Plan — process the data, understand the situation, and decide what to do.\n3. Act — execute the chosen action using actuators.\n4. Repeat — the cycle runs continuously, often hundreds of times per second.\n\nFor a robot vacuum, this means: scan the room for obstacles → plan a path → move → scan again. For a surgical robot, it means: detect tissue type → calculate incision → make precise cut.',
      },
      {
        heading: 'Types of robots',
        body: '• Industrial robots — fixed-arm robots in factories welding, painting, and assembling products at superhuman speed and precision.\n• Collaborative robots (cobots) — designed to work alongside humans safely, adapting their force and speed.\n• Autonomous vehicles — cars, drones, and delivery bots that navigate independently.\n• Humanoid robots — bipedal robots designed to work in human environments (Boston Dynamics Atlas, Tesla Optimus).\n• Medical robots — systems like the Da Vinci Surgical Robot that enable minimally invasive surgery with extreme precision.',
        callout: 'Amazon\'s warehouses use over 750,000 robots to pick, sort, and transport packages — making order fulfilment 4x faster than human-only warehouses.',
      },
      {
        heading: 'The future of work and automation',
        body: 'Automation is transforming every industry. Routine, repetitive physical tasks are most at risk of automation: data entry, assembly line work, truck driving, and basic food preparation. Jobs requiring creativity, empathy, complex judgment, and physical dexterity in unstructured environments are more resilient.\n\nHistory shows that while automation eliminates some jobs, it also creates new ones — often better-paying and less physically demanding. The key is ensuring the transition is fair and that education systems prepare people for the jobs of tomorrow.',
      },
    ],
    funFact: 'The Mars Rover Perseverance travels at a blazing top speed of 152 metres per hour — roughly 0.15 km/h. At that speed, crossing the average city would take over a week. Caution is critical when operating 225 million kilometres from the nearest mechanic.',
    quickCheck: {
      question: 'A robot vacuum maps your room, avoids obstacles, and returns to its dock when the battery is low. Which part of this describes the "Plan" phase of Sense-Plan-Act?',
      options: [
        'The camera detecting a chair leg',
        'The motor spinning the wheels',
        'Calculating a path that avoids the chair and reaches the dock',
        'The battery level dropping below 20%',
      ],
      answer: 'Calculating a path that avoids the chair and reaches the dock',
      explanation: 'Sensing is gathering data (camera detects chair). Acting is moving the wheels. Planning is the decision-making in between — computing the optimal route based on what was sensed.',
    },
    trueOrFalse: [
      { statement: 'Actuators are the sensors that let robots perceive their environment', answer: false, explanation: 'Sensors perceive the environment. Actuators (motors, servos) are what make the robot physically move and act.' },
      { statement: 'The Sense-Plan-Act cycle runs continuously while a robot operates', answer: true, explanation: 'Robots constantly cycle through sensing, planning, and acting — often hundreds of times per second.' },
      { statement: 'Collaborative robots (cobots) are designed to work safely alongside humans', answer: true, explanation: 'Cobots are built with force limiting, rounded edges, and sensors to detect humans and slow down or stop when needed.' },
      { statement: 'Automation has historically eliminated all jobs in affected industries', answer: false, explanation: 'Automation typically changes the nature of work, eliminating some roles while creating new ones. Net employment effects depend on the era and industry.' },
      { statement: 'The Mars Rover can receive and respond to real-time commands from Earth', answer: false, explanation: 'Signals take up to 24 minutes to travel between Earth and Mars. Rovers must operate autonomously for many tasks.' },
    ],
  },

  'Generative AI': {
    hook: 'An AI-created artwork sold at Christie\'s auction house for $432,500. AI wrote a song that reached the charts. We are living through a creative revolution.',
    intro: 'Generative AI refers to AI systems that create new content — text, images, music, video, code, and more. Unlike traditional AI that analyses or classifies existing data, generative models synthesise entirely new outputs. They are powered by massive neural networks trained on huge datasets, and they are reshaping every creative and knowledge-based profession.',
    sections: [
      {
        heading: 'How language models generate text',
        body: 'Large Language Models (LLMs) like GPT-4 and Claude are trained to predict the next word in a sequence, using trillions of words of text. After training on this enormous dataset, the model has encoded vast knowledge about language, facts, reasoning patterns, and writing styles.\n\nWhen you type a prompt, the model generates a response one token at a time — each token chosen based on what is most likely to continue the conversation coherently. It does not retrieve pre-written answers; it generates each response fresh.',
        callout: 'ChatGPT reached 100 million users in just 2 months — faster than any technology in history. For comparison, Instagram took 2.5 years.',
      },
      {
        heading: 'How image generation works',
        body: 'Image generators like DALL·E, Midjourney, and Stable Diffusion use a technique called diffusion. The model is trained by taking images, progressively adding random noise until they become pure static, then learning to reverse the process — turning noise back into a clear image.\n\nAt generation time, you give it a text description and random noise. The model iteratively refines the noise, guided by your description, until a coherent image emerges. The result is photorealistic images, artistic styles, or entirely new visual concepts that have never existed before.',
      },
      {
        heading: 'Prompting: talking to AI effectively',
        body: 'A prompt is the instruction or context you give to a generative AI. The quality of the output depends enormously on prompt quality. Good prompts are:\n\n• Specific — "Write a haiku about autumn in the style of Matsuo Bashō" beats "write a poem".\n• Contextual — provide background: "I am a 10-year-old, explain quantum physics simply".\n• Iterative — if the first output is not quite right, refine the prompt and try again.\n\nPrompt engineering has become a valued skill in industry as organisations integrate LLMs into their workflows.',
        callout: 'Some companies now pay over £100,000 per year for expert "prompt engineers" — people who specialise in getting the best outputs from AI systems.',
      },
      {
        heading: 'Hallucinations, risks, and the future',
        body: 'Generative AI has significant limitations. LLMs "hallucinate" — they confidently state false information, fabricate citations, and invent facts that sound plausible but are wrong. They can also reproduce biases from their training data and be used to generate disinformation at scale.\n\nDespite these risks, the trajectory is extraordinary. Multimodal models understand and generate text, images, audio, and video simultaneously. AI agents can autonomously browse the web, write and run code, and complete multi-step tasks. The next decade will see generative AI woven into every professional and creative workflow.',
      },
    ],
    funFact: 'Stable Diffusion, one of the most popular open-source image generators, was trained on 2.3 billion image-text pairs scraped from the internet — and the entire model\'s weights fit on a laptop hard drive.',
    quickCheck: {
      question: 'An LLM generates a confident-sounding answer that is factually incorrect. What is this phenomenon called?',
      options: ['Overfitting', 'Hallucination', 'Tokenisation error', 'Prompt injection'],
      answer: 'Hallucination',
      explanation: 'Hallucination describes when an LLM generates plausible-sounding but factually incorrect content. It occurs because the model predicts likely-sounding text rather than retrieving verified facts.',
    },
    trueOrFalse: [
      { statement: 'Large language models retrieve pre-written answers from a database', answer: false, explanation: 'LLMs generate each response from scratch by predicting the most likely next token, based on patterns learned during training.' },
      { statement: 'Diffusion models generate images by learning to remove noise from images', answer: true, explanation: 'Diffusion models are trained to reverse a noising process — learning to turn random noise back into clear images guided by a text description.' },
      { statement: 'A more specific and detailed prompt generally produces better AI outputs', answer: true, explanation: 'Specific, contextual prompts give the model more information to work with, resulting in more accurate and useful outputs.' },
      { statement: 'Generative AI cannot produce biased or harmful content', answer: false, explanation: 'Generative models can reproduce and amplify biases from training data, and can be misused to generate disinformation or harmful content.' },
      { statement: 'ChatGPT reached 100 million users faster than any previous technology', answer: true, explanation: 'ChatGPT hit 100 million users in just 2 months after launch — a faster adoption rate than Instagram, TikTok, or any previous platform.' },
    ],
  },

}
