-- 009_topics_6_7_questions.sql
-- Seeds 55 questions × 3 tracks for Topic 6 (NLP) and Topic 7 (Computer Vision)

do $$
declare
  t6 uuid;
  t7 uuid;
begin
  select id into t6 from public.topics where order_index = 6;
  select id into t7 from public.topics where order_index = 7;

  -- ══════════════════════════════════════════════════════
  --  TOPIC 6: Natural Language Processing
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t6, 1, 'story', 'mcq', 'NLP stands for:', '["New Learning Program","Natural Language Processing","Numeric Logic Processing","None of these"]', 'Natural Language Processing', 'NLP is the field of AI that teaches computers to understand and work with human language — words and sentences!', true),
  (t6, 2, 'story', 'mcq', 'ARIA can read sentences and understand what they mean. This is called:', '["Vision","Natural Language Processing","Sorting","Robotics"]', 'Natural Language Processing', 'NLP gives computers the ability to read, understand, and generate human language — like a robot learning to read!', true),
  (t6, 3, 'story', 'mcq', 'ARIA breaks the sentence "I love dogs" into three separate words. This is called:', '["Sorting","Tokenization","Labelling","Compression"]', 'Tokenization', 'Tokenization splits text into smaller pieces (tokens) — usually words or parts of words — for processing.', true),
  (t6, 4, 'story', 'mcq', 'ARIA reads "The movie was GREAT!" and says the writing is happy and positive. This skill is called:', '["Tokenization","Sentiment analysis","Machine translation","Grammar check"]', 'Sentiment analysis', 'Sentiment analysis identifies the emotional tone of text — positive, negative, or neutral!', true),
  (t6, 5, 'story', 'mcq', 'ARIA translates "Namaste" from Nepali into English. This is called:', '["Grammar checking","Machine translation","Tokenization","Sentiment analysis"]', 'Machine translation', 'Machine translation automatically converts text from one language to another — like having a robot translator!', true),
  (t6, 6, 'story', 'mcq', 'When you speak to ARIA and she understands you, what skill is she using?', '["Computer vision","Speech recognition and NLP","Sorting","Boolean logic"]', 'Speech recognition and NLP', 'Speech recognition converts your voice to text, then NLP understands the meaning — together they power voice assistants!', true),
  (t6, 7, 'story', 'mcq', 'ARIA finishes your sentence for you. She is doing:', '["Sentiment analysis","Text completion / generation","Machine translation","Sorting"]', 'Text completion / generation', 'Text generation predicts and produces the next words — this is how AI writing assistants and chatbots work!', true),
  (t6, 8, 'story', 'mcq', 'ARIA checks if your spelling is correct. This is called:', '["Tokenization","Spell checking","Sentiment analysis","Translation"]', 'Spell checking', 'Spell checking is an NLP application that detects and corrects spelling errors in text!', true),
  (t6, 9, 'story', 'mcq', 'The word "bank" can mean a river bank or a money bank. Teaching ARIA which one is meant is called:', '["Tokenization","Word sense disambiguation","Sorting","Labelling"]', 'Word sense disambiguation', 'Word sense disambiguation figures out which meaning of a word is intended from context — a hard NLP challenge!', true),
  (t6, 10, 'story', 'mcq', 'Which everyday device uses NLP when you speak to it?', '["A calculator","A voice assistant like Siri or Alexa","A printer","A camera"]', 'A voice assistant like Siri or Alexa', 'Voice assistants use NLP to understand spoken commands and give helpful responses — NLP in everyday life!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'story', 'mcq',
    'Language Robot Game #' || n || ': ARIA reads "I love this!" and says it is positive writing. What skill is this?',
    '["Machine translation","Tokenization","Sentiment analysis","Sorting"]',
    'Sentiment analysis', 'Sentiment analysis identifies positive, negative, or neutral feelings in text — a very useful NLP skill!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'story', 'mcq',
    'ARIA''s Language Expert #' || n || ': AI models like ChatGPT that understand and generate text are called:',
    '["Computer vision models","Large Language Models (LLMs)","Sorting robots","Calculators"]',
    'Large Language Models (LLMs)', 'LLMs like ChatGPT are trained on massive amounts of text to understand and generate human language!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t6, 1, 'levels', 'mcq', 'What does tokenization do in NLP?', '["Translates text to another language","Splits text into words or sub-word units for processing","Classifies sentiment","Compresses text files"]', 'Splits text into words or sub-word units for processing', 'Tokenization is the first NLP step — "I love AI" becomes ["I", "love", "AI"]. Sub-word tokenizers (BPE) handle unknown words.', true),
  (t6, 2, 'levels', 'mcq', 'Word embeddings represent words as:', '["Images","Random numbers","Dense numerical vectors that capture semantic meaning","Sorted alphabetical lists"]', 'Dense numerical vectors that capture semantic meaning', 'Word2Vec, GloVe, etc. map words to vectors where similar words are close — "king" - "man" + "woman" ≈ "queen".', true),
  (t6, 3, 'levels', 'mcq', 'Sentiment analysis classifies text as:', '["Translated into another language","Positive, negative, or neutral in emotional tone","Sorted alphabetically","Tokenized only"]', 'Positive, negative, or neutral in emotional tone', 'Sentiment analysis detects emotion in text — useful for product reviews, social media monitoring, and customer feedback.', true),
  (t6, 4, 'levels', 'mcq', '"Stop words" in NLP are:', '["Rare technical words","Very common words (the, is, a) often removed before processing","Misspelled words","Words that end sentences"]', 'Very common words (the, is, a) often removed before processing', 'Stop words carry little meaning for classification tasks, so removing them reduces noise and speeds processing.', true),
  (t6, 5, 'levels', 'mcq', 'In Word2Vec embeddings, semantically similar words are:', '["Far apart in vector space","Close together in vector space","Always identical vectors","Randomly placed"]', 'Close together in vector space', 'Word2Vec learns embeddings so similar-context words cluster together — "cat" and "kitten" are near each other.', true),
  (t6, 6, 'levels', 'mcq', 'Named Entity Recognition (NER) extracts:', '["Grammar rules from text","Entities like people''s names, places, and organisations from text","Word frequency counts","Translations"]', 'Entities like people''s names, places, and organisations from text', 'NER tags tokens as PERSON, LOCATION, ORGANISATION, etc. — e.g. "Apple" in "Apple released a phone" → ORG.', true),
  (t6, 7, 'levels', 'mcq', 'Which technique converts words to their base/root form (e.g. "running" → "run")?', '["Tokenization","Stemming and Lemmatization","Sentiment analysis","Encoding"]', 'Stemming and Lemmatization', 'Stemming chops suffixes ("running"→"run"). Lemmatization uses grammar rules ("better"→"good"). Both reduce vocabulary size.', true),
  (t6, 8, 'levels', 'mcq', 'A language model predicts:', '["Sentiment only","The next word or token given the previous context","Image captions","Code bugs"]', 'The next word or token given the previous context', 'Language models learn P(next word | previous words). This enables text completion, generation, and understanding.', true),
  (t6, 9, 'levels', 'mcq', 'TF-IDF stands for:', '["Text Format - Indexed Data File","Term Frequency - Inverse Document Frequency","Total Features - Image Detection","None of the above"]', 'Term Frequency - Inverse Document Frequency', 'TF-IDF scores words highly if they appear often in one document but rarely across all documents — highlighting unique terms.', true),
  (t6, 10, 'levels', 'mcq', 'BERT reads text in which direction?', '["Left to right only","Right to left only","Both directions simultaneously","Randomly"]', 'Both directions simultaneously', 'BERT (Bidirectional Encoder Representations from Transformers) sees both left and right context — richer than left-only GPT pretraining.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'levels', 'mcq',
    'NLP Drill #' || n || ': Words that appear often in one document but rarely in the corpus score high in:',
    '["Tokenization score","TF-IDF","BERT embedding","Lemmatization score"]',
    'TF-IDF', 'TF-IDF rewards words that are locally frequent (TF) but globally rare (IDF) — capturing domain-specific terms.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'levels', 'mcq',
    'Advanced NLP #' || n || ': The "Attention Is All You Need" paper (2017) introduced which architecture?',
    '["LSTM","CNN for NLP","Transformer","BERT"]',
    'Transformer', 'Vaswani et al. replaced RNNs with pure self-attention in the Transformer — the foundation of all modern LLMs.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t6, 1, 'sandbox', 'mcq', 'The self-attention mechanism in Transformers allows:', '["Faster matrix multiplication","Every token to attend to all other tokens in the sequence simultaneously","Fewer total parameters","Reduced memory usage always"]', 'Every token to attend to all other tokens in the sequence simultaneously', 'Self-attention computes pairwise token interactions via Q·Kᵀ/√d_k, enabling the model to weigh any context.', true),
  (t6, 2, 'sandbox', 'mcq', 'GPT (Generative Pre-trained Transformer) is best described as:', '["A bidirectional encoder","An autoregressive decoder predicting tokens left-to-right","A convolutional network for text","A supervised classification model"]', 'An autoregressive decoder predicting tokens left-to-right', 'GPT is a decoder-only Transformer trained to predict the next token — generation proceeds one token at a time.', true),
  (t6, 3, 'sandbox', 'mcq', 'Byte Pair Encoding (BPE) is used as a:', '["Word embedding method","Sub-word tokenization algorithm that merges frequent byte pairs iteratively","Attention mechanism","Sequence-to-sequence architecture"]', 'Sub-word tokenization algorithm that merges frequent byte pairs iteratively', 'BPE builds a vocabulary by merging the most frequent adjacent pairs — balancing vocabulary size with coverage of rare words.', true),
  (t6, 4, 'sandbox', 'mcq', 'In scaled dot-product attention, why is the dot product divided by √d_k?', '["To increase the magnitude of attention scores","To prevent large dot products that push softmax into near-zero gradient regions","To speed up computation","To reduce vocabulary size"]', 'To prevent large dot products that push softmax into near-zero gradient regions', 'With high-dimensional keys (large d_k), dot products grow large, saturating softmax. Scaling by √d_k keeps gradients healthy.', true),
  (t6, 5, 'sandbox', 'mcq', 'Perplexity in language models measures:', '["Model inference speed","How well the model predicts a sample — lower perplexity means better predictions","Dataset vocabulary size","Number of parameters"]', 'How well the model predicts a sample — lower perplexity means better predictions', 'Perplexity = exp(cross-entropy). A perplexity of 10 means the model is as uncertain as choosing between 10 equal options.', true),
  (t6, 6, 'sandbox', 'mcq', 'Fine-tuning a pre-trained LLM on a specific task means:', '["Training the model from random weights","Continuing training on task-specific labelled data, updating some or all parameters","Only changing the tokenizer","Building a new architecture on top"]', 'Continuing training on task-specific labelled data, updating some or all parameters', 'Fine-tuning adapts pre-trained representations cheaply — far less data and compute than training from scratch.', true),
  (t6, 7, 'sandbox', 'mcq', 'RLHF (Reinforcement Learning from Human Feedback) is used to:', '["Pre-train language models on web data","Align model outputs with human preferences using a reward model trained on human rankings","Reduce model size","Improve tokenization quality"]', 'Align model outputs with human preferences using a reward model trained on human rankings', 'RLHF trains a reward model on human comparisons, then uses PPO to optimise the LLM against that reward signal.', true),
  (t6, 8, 'sandbox', 'mcq', 'Positional encoding in Transformers solves the problem that:', '["Attention is too slow","Transformers have no inherent notion of token order — they process all tokens in parallel","Vocabulary is too large","Embeddings are not differentiable"]', 'Transformers have no inherent notion of token order — they process all tokens in parallel', 'Unlike RNNs, Transformers process all tokens simultaneously. Positional encodings inject order information into embeddings.', true),
  (t6, 9, 'sandbox', 'mcq', 'In Retrieval-Augmented Generation (RAG), retrieved documents are:', '["Used to retrain the model","Appended to the prompt at inference time, grounding the generation in external knowledge","Used to fine-tune the model","Ignored — generation is purely parametric"]', 'Appended to the prompt at inference time, grounding the generation in external knowledge', 'RAG retrieves relevant chunks from a vector store and injects them into the context window — reducing hallucinations without retraining.', true),
  (t6, 10, 'sandbox', 'mcq', 'The context window of an LLM determines:', '["The number of model parameters","The maximum number of tokens the model can process in one forward pass","Training speed","Vocabulary size"]', 'The maximum number of tokens the model can process in one forward pass', 'Context window = how much text the model can "see" at once. Longer windows enable handling longer documents and conversations.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'sandbox', 'mcq',
    'NLP Advanced #' || n || ': Self-attention computational complexity per layer scales with sequence length as:',
    '["O(n)","O(n log n)","O(n²)","O(1)"]',
    'O(n²)', 'Self-attention computes all n×n pairwise token scores — quadratic in sequence length. This limits context window size.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t6, n, 'sandbox', 'mcq',
    'Expert NLP #' || n || ': In the scaled dot-product attention formula Q·Kᵀ/√d_k, what do Q, K, and V represent?',
    '["Quantities, Keys, Values — three lookup table types","Query, Key, Value — linear projections of the input used in the attention mechanism","Question, Knowledge, Vocabulary","Queue, Kernel, Vector"]',
    'Query, Key, Value — linear projections of the input used in the attention mechanism', 'Q queries for relevant content, K represents what each token contains, V is the content to aggregate based on attention scores.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;


  -- ══════════════════════════════════════════════════════
  --  TOPIC 7: Computer Vision
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t7, 1, 'story', 'mcq', 'ARIA''s robot uses a camera to see the world. The camera captures:', '["Sounds","Smells","Images / pictures","Temperature"]', 'Images / pictures', 'Cameras capture visual information as images — ARIA uses these images to understand what is around her!', true),
  (t7, 2, 'story', 'mcq', 'A digital image is made up of millions of tiny coloured squares. What are these called?', '["Dots","Pixels","Bits","Drops"]', 'Pixels', 'Pixels are the tiny building blocks of digital images. More pixels = sharper, more detailed images!', true),
  (t7, 3, 'story', 'mcq', 'ARIA looks at a photo and says "That is a dog!" This skill is called:', '["Image sorting","Image recognition","Image printing","Image deleting"]', 'Image recognition', 'Image recognition is teaching computers to identify objects, animals, and people in pictures — very useful AI!', true),
  (t7, 4, 'story', 'mcq', 'The more pixels an image has, the:', '["Smaller it looks","Higher the image resolution (more detail)","Darker it appears","Fewer colours it can have"]', 'Higher the image resolution (more detail)', 'More pixels = higher resolution = sharper detail. That is why phone cameras advertise megapixels!', true),
  (t7, 5, 'story', 'mcq', 'Which of these can ARIA use computer vision for?', '["Playing music","Reading text written in a photo","Calculating maths","Sending emails"]', 'Reading text written in a photo', 'OCR (Optical Character Recognition) uses computer vision to read text from images — like scanning a document!', true),
  (t7, 6, 'story', 'mcq', 'ARIA''s camera spots faces in a photo and draws boxes around them. This is called:', '["Face recognition","Face detection","Face painting","Face sorting"]', 'Face detection', 'Face detection finds WHERE faces are in an image. Face recognition then identifies WHO the face belongs to!', true),
  (t7, 7, 'story', 'mcq', 'In a greyscale image, each pixel has a brightness value from 0 (black) to:', '["50","100","200","255"]', '255', 'Greyscale uses 8 bits per pixel — values 0 to 255. 0 is pure black, 255 is pure white!', true),
  (t7, 8, 'story', 'mcq', 'Self-driving cars use computer vision mainly to:', '["Play music","See the road, pedestrians, signs, and other vehicles","Send text messages","Draw maps on paper"]', 'See the road, pedestrians, signs, and other vehicles', 'Self-driving cars have cameras and vision AI to detect obstacles, read road signs, and navigate safely!', true),
  (t7, 9, 'story', 'mcq', 'ARIA can tell where objects are in a picture and draw boxes around them. This is called object:', '["Sorting","Detection","Printing","Copying"]', 'Detection', 'Object detection finds objects in images AND locates them with bounding boxes — like spotting all the cats in a photo!', true),
  (t7, 10, 'story', 'mcq', 'Teaching a computer to understand images is part of which AI field?', '["Natural language processing","Computer vision","Only robotics","Sorting algorithms"]', 'Computer vision', 'Computer vision is the AI field dedicated to helping machines interpret and understand visual information from images and video!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'story', 'mcq',
    'ARIA''s Camera Quest #' || n || ': What is each tiny coloured square in a digital image called?',
    '["A dot","A pixel","A bit","A colour block"]',
    'A pixel', 'Images are made of pixels — each one stores a colour value. More pixels = higher resolution = sharper image!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'story', 'mcq',
    'ARIA''s Vision Expert #' || n || ': AI detecting whether someone is smiling uses which technology?',
    '["Sorting algorithms","Facial expression recognition using computer vision","Tokenization","Boolean logic"]',
    'Facial expression recognition using computer vision', 'Facial expression recognition trains CV models to classify emotions from facial muscle positions — amazing CV application!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t7, 1, 'levels', 'mcq', 'Which type of neural network is most commonly used for image recognition tasks?', '["RNN","CNN (Convolutional Neural Network)","LSTM","Transformer only"]', 'CNN (Convolutional Neural Network)', 'CNNs use convolutional filters that detect local features (edges, textures) and are translation-invariant — ideal for images.', true),
  (t7, 2, 'levels', 'mcq', 'A convolutional layer in a CNN applies filters to detect:', '["Only pixel colours","Local spatial features like edges, corners, and textures","Full image patterns at once","Pixel counts"]', 'Local spatial features like edges, corners, and textures', 'Filters slide (convolve) over the image detecting local patterns. Early layers detect edges; deeper layers detect complex shapes.', true),
  (t7, 3, 'levels', 'mcq', 'Max pooling in a CNN reduces spatial dimensions by:', '["Adding all pixel values","Taking the maximum value in each pooling region","Multiplying by a filter","Averaging all values"]', 'Taking the maximum value in each pooling region', 'Max pooling downsamples feature maps by keeping only the strongest activation in each region, reducing computation.', true),
  (t7, 4, 'levels', 'mcq', 'RGB in a colour image stands for:', '["Red Gray Black — three shades","Red Green Blue — the three colour channels","Resolution Grid Bits","None of these"]', 'Red Green Blue — the three colour channels', 'Colour images have 3 channels (R, G, B) — each pixel has three values defining its colour intensity.', true),
  (t7, 5, 'levels', 'mcq', 'Image augmentation (flips, rotations, crops) during training helps to:', '["Reduce image file size","Artificially expand training data variety and improve generalisation","Speed up inference","Increase model depth"]', 'Artificially expand training data variety and improve generalisation', 'Augmentation creates modified versions of training images — the model sees more variety and becomes more robust.', true),
  (t7, 6, 'levels', 'mcq', 'Object detection returns:', '["Only a class label","Bounding boxes with coordinates AND class labels for objects in the image","Only pixel values","Greyscale conversion"]', 'Bounding boxes with coordinates AND class labels for objects in the image', 'Detection (e.g. YOLO, Faster R-CNN) outputs both what the object is and where it is (bounding box coordinates).', true),
  (t7, 7, 'levels', 'mcq', 'Transfer learning in CV commonly fine-tunes networks pre-trained on:', '["COCO only","ImageNet — 1.2 million images across 1000 classes","MNIST only","Wikipedia text"]', 'ImageNet — 1.2 million images across 1000 classes', 'ImageNet-trained weights (ResNet, VGG, etc.) encode rich general visual features reusable for many CV tasks.', true),
  (t7, 8, 'levels', 'mcq', 'The flatten layer in a CNN converts:', '["Input image to greyscale","2D feature maps into a 1D vector for fully-connected classification layers","Colour channels to a single value","Depth to 1"]', '2D feature maps into a 1D vector for fully-connected classification layers', 'After convolutions, feature maps are flattened to a vector so fully-connected layers can output class scores.', true),
  (t7, 9, 'levels', 'mcq', 'Semantic segmentation classifies:', '["Only bounding boxes of objects","Every single pixel in the image with a class label","Image sentiment","Colour histograms"]', 'Every single pixel in the image with a class label', 'Semantic segmentation assigns a class to each pixel (sky, road, car, person) — used in autonomous driving.', true),
  (t7, 10, 'levels', 'mcq', 'Face recognition identifies individuals using which deep learning technique?', '["Decision trees","Siamese networks or embedding-based matching","k-means clustering","Linear regression"]', 'Siamese networks or embedding-based matching', 'Face recognition learns embeddings where the same person''s faces are close in vector space — similarity search identifies who.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'levels', 'mcq',
    'Vision Drill #' || n || ': A CNN kernel/filter detects features by:',
    '["Storing data in memory","Sliding over the input and computing dot products to detect local patterns","Classifying the whole image at once","Pooling features"]',
    'Sliding over the input and computing dot products to detect local patterns', 'Convolution slides the filter across the input. Where the filter matches the input pattern, the activation is high.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'levels', 'mcq',
    'Advanced Vision #' || n || ': Feature maps in a CNN represent:',
    '["Raw pixel values","Learned spatial features at different abstraction levels","Output class probabilities","Input image copies"]',
    'Learned spatial features at different abstraction levels', 'Each feature map is a filter''s response — early maps detect edges, later maps detect shapes, objects, and semantics.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t7, 1, 'sandbox', 'mcq', 'The receptive field of a neuron in a CNN refers to:', '["The filter size itself","The region of the original input image that influences that neuron''s activation","The number of channels","The stride value"]', 'The region of the original input image that influences that neuron''s activation', 'Receptive field grows with depth — deeper neurons integrate information from progressively larger image regions.', true),
  (t7, 2, 'sandbox', 'mcq', 'YOLO (You Only Look Once) achieves real-time detection by:', '["Processing image regions sequentially","Processing the entire image in a SINGLE forward pass with a grid-based prediction head","Using multiple passes","Training a separate model per class"]', 'Processing the entire image in a SINGLE forward pass with a grid-based prediction head', 'YOLO divides the image into a grid; each cell predicts bounding boxes and class probabilities simultaneously — very fast.', true),
  (t7, 3, 'sandbox', 'mcq', 'Batch normalisation in CNNs helps by:', '["Reducing model parameters","Stabilising and accelerating training by normalising layer inputs within each mini-batch","Detecting edges in images","Performing max pooling"]', 'Stabilising and accelerating training by normalising layer inputs within each mini-batch', 'BatchNorm reduces internal covariate shift, enables higher LRs, reduces gradient sensitivity, and acts as regularisation.', true),
  (t7, 4, 'sandbox', 'mcq', 'Anchor boxes in object detection are:', '["Training labels","Pre-defined bounding box shapes of various aspect ratios used as reference predictions","Pooling operations","Feature map layers"]', 'Pre-defined bounding box shapes of various aspect ratios used as reference predictions', 'Anchor boxes provide a prior shape; the model predicts offsets (Δx, Δy, Δw, Δh) to adjust anchors to fit objects.', true),
  (t7, 5, 'sandbox', 'mcq', 'Instance segmentation differs from semantic segmentation by:', '["Using less GPU memory","Distinguishing and masking individual object instances, not just class regions","Running faster","Using fewer output classes"]', 'Distinguishing and masking individual object instances, not just class regions', 'Mask R-CNN performs instance segmentation — two cats in the same image get separate masks, unlike semantic seg.', true),
  (t7, 6, 'sandbox', 'mcq', 'A GAN (Generative Adversarial Network) for image synthesis trains:', '["One network end-to-end","A generator and discriminator in adversarial competition","Three separate networks","A CNN and RNN jointly"]', 'A generator and discriminator in adversarial competition', 'Generator produces fake images; discriminator classifies real vs fake. Adversarial training improves both until fakes are indistinguishable.', true),
  (t7, 7, 'sandbox', 'mcq', 'Depthwise separable convolutions (used in MobileNet) reduce computation by:', '["Increasing accuracy","Factoring standard convolution into depthwise + pointwise, drastically reducing multiply-adds","Adding more layers","Removing activation functions"]', 'Factoring standard convolution into depthwise + pointwise, drastically reducing multiply-adds', 'Depthwise applies one filter per channel; pointwise combines channels with 1×1 convolutions — 8-9× fewer FLOPs.', true),
  (t7, 8, 'sandbox', 'mcq', 'Intersection over Union (IoU) measures:', '["Pixel classification accuracy","Overlap between predicted and ground-truth bounding boxes: |A∩B|/|A∪B|","Model inference speed","Feature map size"]', 'Overlap between predicted and ground-truth bounding boxes: |A∩B|/|A∪B|', 'IoU = intersection area / union area. IoU > 0.5 is typically considered a correct detection in standard benchmarks.', true),
  (t7, 9, 'sandbox', 'mcq', 'Non-Maximum Suppression (NMS) in object detection removes:', '["Low-confidence predictions below a threshold","Duplicate overlapping bounding boxes for the same object — keeping only the highest confidence one","Small objects","All false negatives"]', 'Duplicate overlapping bounding boxes for the same object — keeping only the highest confidence one', 'Models often predict multiple boxes per object. NMS suppresses boxes with IoU > threshold vs higher-scoring boxes.', true),
  (t7, 10, 'sandbox', 'mcq', 'Vision Transformers (ViT) process images by:', '["Applying convolutional filters","Splitting the image into fixed-size patches and treating each patch as a token for a Transformer encoder","Using recurrent processing","Only global average pooling"]', 'Splitting the image into fixed-size patches and treating each patch as a token for a Transformer encoder', 'ViT flattens 16×16 patches into sequence tokens. Self-attention then models global patch relationships without convolutions.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'sandbox', 'mcq',
    'Vision Advanced #' || n || ': Residual (skip) connections in ResNets enable training very deep networks by:',
    '["Reducing the number of parameters","Adding the layer input directly to its output, creating shortcut gradient paths","Removing all activation functions","Using only pooling layers"]',
    'Adding the layer input directly to its output, creating shortcut gradient paths', 'H(x) = F(x) + x means ∂L/∂x receives gradients from both the main path and the shortcut — preventing vanishing gradients.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t7, n, 'sandbox', 'mcq',
    'Expert Vision #' || n || ': Self-attention in Vision Transformers (ViT) scales computationally with the number of patches as:',
    '["O(n)","O(n log n)","O(n²) — quadratic in patch count","O(1)"]',
    'O(n²) — quadratic in patch count', 'ViT self-attention is O(n²) in patch count. More/smaller patches greatly increases computation — a key ViT trade-off.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

end;
$$;
