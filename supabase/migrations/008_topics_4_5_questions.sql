-- 008_topics_4_5_questions.sql
-- Seeds 55 questions × 3 tracks for Topic 4 (Machine Learning Basics) and Topic 5 (Neural Networks)

do $$
declare
  t4 uuid;
  t5 uuid;
begin
  select id into t4 from public.topics where order_index = 4;
  select id into t5 from public.topics where order_index = 5;

  -- ══════════════════════════════════════════════════════
  --  TOPIC 4: Machine Learning Basics
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t4, 1, 'story', 'mcq', 'ARIA learns to spot cats by looking at 1,000 cat pictures. What is this called?', '["Programming","Machine learning","Guessing","Sorting"]', 'Machine learning', 'Machine learning lets computers learn from examples — just like ARIA learning what a cat looks like!', true),
  (t4, 2, 'story', 'mcq', 'The pictures ARIA uses to learn from are called:', '["An algorithm","Training data","A loop","A sort"]', 'Training data', 'Training data is the set of examples a machine learning model learns from — the more, the better!', true),
  (t4, 3, 'story', 'mcq', 'ARIA''s teacher tells her whether each answer is RIGHT or WRONG as she learns. This is called:', '["Unsupervised learning","Supervised learning","Random learning","Loop learning"]', 'Supervised learning', 'Supervised learning uses labelled examples where each one has a known correct answer — the teacher guides ARIA!', true),
  (t4, 4, 'story', 'mcq', 'ARIA guesses a picture is a cat, but it is actually a dog. The correct answer "dog" is called the:', '["Feature","Label","Prediction","Bug"]', 'Label', 'A label is the correct answer attached to each training example. ARIA learns to match pictures to their labels!', true),
  (t4, 5, 'story', 'mcq', 'Which part of a picture does ARIA look at to decide if it is a cat?', '["Features","Labels","Bugs","Loops"]', 'Features', 'Features are the measurable parts of data the model uses — like ear shape, eye size, fur colour!', true),
  (t4, 6, 'story', 'mcq', 'After training, ARIA looks at NEW pictures she has never seen before. This is called:', '["Training","Testing","Looping","Debugging"]', 'Testing', 'Testing checks how well the model works on new, unseen data — the real measure of how well it learned!', true),
  (t4, 7, 'story', 'mcq', 'ARIA correctly identified 9 out of 10 cat pictures. Her accuracy is:', '["90%","100%","80%","9%"]', '90%', 'Accuracy = correct answers ÷ total answers. 9 ÷ 10 = 0.9 = 90%!', true),
  (t4, 8, 'story', 'mcq', 'ARIA learns by grouping similar toys together WITHOUT anyone telling her the groups. This is:', '["Supervised learning","Unsupervised learning","Boolean learning","Looping"]', 'Unsupervised learning', 'Unsupervised learning finds patterns in data without labels — no teacher needed, ARIA figures it out herself!', true),
  (t4, 9, 'story', 'mcq', 'Machine learning is about teaching computers to:', '["Follow only exact pre-written instructions","Learn from examples and improve over time","Sort numbers really fast","Draw beautiful pictures"]', 'Learn from examples and improve over time', 'Machine learning lets computers get better at tasks by learning from data — they improve with experience!', true),
  (t4, 10, 'story', 'mcq', 'ARIA plays a game and gets points for good moves, learning to play better over time. This is:', '["Supervised learning","Unsupervised learning","Reinforcement learning","Boolean learning"]', 'Reinforcement learning', 'Reinforcement learning trains by rewards and penalties — ARIA learns to make decisions that earn the most points!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'story', 'mcq',
    'ARIA''s Learning Game #' || n || ': ARIA learns from pictures with labels saying "cat" or "dog". What type of learning is this?',
    '["Unsupervised","Supervised","Random","Loop learning"]',
    'Supervised', 'Supervised learning uses labelled data — each example has a known correct answer that teaches the model!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'story', 'mcq',
    'ARIA''s Expert Learning #' || n || ': ARIA learns WITHOUT any teacher giving correct answers. What type of learning is this?',
    '["Supervised learning","Unsupervised learning","Boolean learning","Looping"]',
    'Unsupervised learning', 'Unsupervised learning finds hidden patterns in unlabelled data — no teacher needed!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t4, 1, 'levels', 'mcq', 'Which type of ML uses labelled training data with known correct outputs?', '["Unsupervised learning","Supervised learning","Reinforcement learning","Transfer learning"]', 'Supervised learning', 'Supervised learning maps inputs to known outputs. The model learns a function f(x) ≈ y from labelled pairs (x, y).', true),
  (t4, 2, 'levels', 'mcq', 'In a classification task, the model predicts a:', '["Continuous number","Discrete category or class","Probability only","Sorted list"]', 'Discrete category or class', 'Classification outputs a discrete class label (e.g. spam/not-spam, cat/dog). Regression outputs continuous values.', true),
  (t4, 3, 'levels', 'mcq', 'What does "overfitting" mean?', '["Model is too simple","Model memorises training data but performs poorly on new data","Model has too little data","Model has zero error"]', 'Model memorises training data but performs poorly on new data', 'Overfitting = model fits noise in training data. High training accuracy but low test accuracy — it did not generalise.', true),
  (t4, 4, 'levels', 'mcq', 'Which ML task predicts a continuous numerical value?', '["Classification","Regression","Clustering","Dimensionality reduction"]', 'Regression', 'Regression predicts numbers (e.g. house price, temperature). Classification predicts discrete classes.', true),
  (t4, 5, 'levels', 'mcq', 'A confusion matrix shows:', '["Model training speed","True positives, false positives, true negatives, false negatives","Dataset size","Algorithm steps"]', 'True positives, false positives, true negatives, false negatives', 'A confusion matrix maps predicted vs actual labels — it reveals error types (false positives vs false negatives).', true),
  (t4, 6, 'levels', 'mcq', 'What is a "feature" in machine learning?', '["A correct label","An input variable used by the model to make predictions","The model output","Training accuracy"]', 'An input variable used by the model to make predictions', 'Features (also called attributes or predictors) are the measurable properties of each data point fed into the model.', true),
  (t4, 7, 'levels', 'mcq', 'K-means clustering is an example of which type of learning?', '["Supervised","Reinforcement","Unsupervised","Semi-supervised"]', 'Unsupervised', 'K-means groups data into k clusters without labels — it discovers structure in unlabelled data.', true),
  (t4, 8, 'levels', 'mcq', 'What does training accuracy measure?', '["How fast the model trains","How well the model fits its training data","Test set performance","Model size in memory"]', 'How well the model fits its training data', 'Training accuracy shows performance on seen data. Test accuracy (on held-out data) measures true generalisation.', true),
  (t4, 9, 'levels', 'mcq', 'Cross-validation is used to:', '["Speed up training","Reliably estimate model performance on unseen data","Clean training data","Build neural networks"]', 'Reliably estimate model performance on unseen data', 'k-fold cross-validation trains and tests on k different data splits — gives a more reliable generalisation estimate.', true),
  (t4, 10, 'levels', 'mcq', 'What technique helps prevent overfitting by randomly ignoring some neurons during training?', '["L2 regularisation","Dropout","Batch normalisation","Data augmentation"]', 'Dropout', 'Dropout randomly zeroes a fraction of neurons each batch — forcing the network not to rely on any single path.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'levels', 'mcq',
    'ML Practice #' || n || ': What does reducing the learning rate do to model training?',
    '["Makes training faster","Makes it slower but more stable","Has no effect","Always causes overfitting"]',
    'Makes it slower but more stable', 'A lower learning rate takes smaller gradient steps — slower convergence but less risk of overshooting the minimum.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'levels', 'mcq',
    'Advanced ML #' || n || ': Which technique prevents overfitting by halting training when validation loss stops improving?',
    '["L2 regularisation","Dropout","Early stopping","Data augmentation"]',
    'Early stopping', 'Early stopping monitors validation loss and stops training when it plateaus or worsens — simple and effective.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t4, 1, 'sandbox', 'mcq', 'The bias-variance tradeoff describes the tension between:', '["Model speed and accuracy","Error from oversimplified assumptions (bias) vs sensitivity to data fluctuations (variance)","Training and test data size","Supervised vs unsupervised learning"]', 'Error from oversimplified assumptions (bias) vs sensitivity to data fluctuations (variance)', 'High bias → underfitting (model too simple). High variance → overfitting (model too complex). Optimal is a balance.', true),
  (t4, 2, 'sandbox', 'mcq', 'L2 regularisation (Ridge) adds which term to the loss function?', '["Sum of absolute weights (L1)","Sum of squared weights × λ","Log of weights","Max weight value"]', 'Sum of squared weights × λ', 'L2 adds λΣw² to the loss, penalising large weights and encouraging smaller, more distributed weight values.', true),
  (t4, 3, 'sandbox', 'mcq', 'Which metric is most appropriate when class imbalance exists (e.g. 99% negative, 1% positive)?', '["Accuracy","F1-score","Precision only","Recall only"]', 'F1-score', 'Accuracy is misleading with imbalanced classes (99% accuracy by predicting all negatives). F1 balances precision and recall.', true),
  (t4, 4, 'sandbox', 'mcq', 'Gradient descent minimises the:', '["Training time","Model complexity","Loss function","Number of features"]', 'Loss function', 'Gradient descent iteratively moves model parameters in the direction of steepest descent of the loss surface.', true),
  (t4, 5, 'sandbox', 'mcq', 'An ROC AUC of 0.5 indicates:', '["A perfect classifier","A random classifier (no discrimination)","The worst possible model","Severe underfitting"]', 'A random classifier (no discrimination)', 'AUC = 0.5 means the model performs no better than random chance — it cannot separate classes.', true),
  (t4, 6, 'sandbox', 'mcq', 'Principal Component Analysis (PCA) is used for:', '["Classification","Dimensionality reduction by projecting onto orthogonal axes of maximum variance","Clustering","Regression"]', 'Dimensionality reduction by projecting onto orthogonal axes of maximum variance', 'PCA finds the directions (principal components) of greatest variance and projects data onto them, reducing dimensions.', true),
  (t4, 7, 'sandbox', 'mcq', 'In 5-fold cross-validation, the model is trained:', '["Once","3 times","5 times","10 times"]', '5 times', 'k-fold creates k splits; in each fold the model trains on k-1 folds and tests on 1 — so 5 training runs total.', true),
  (t4, 8, 'sandbox', 'mcq', 'Which loss function is standard for binary classification with sigmoid output?', '["Mean Squared Error","Binary Cross-Entropy loss","Hinge loss","MAE"]', 'Binary Cross-Entropy loss', 'Binary cross-entropy = -[y·log(ŷ) + (1-y)·log(1-ŷ)]. It measures divergence between probability output and true label.', true),
  (t4, 9, 'sandbox', 'mcq', 'Ensemble methods improve performance by:', '["Using more features","Combining multiple models to reduce variance and/or bias","Using larger datasets only","Applying multiple loss functions"]', 'Combining multiple models to reduce variance and/or bias', 'Bagging reduces variance (Random Forest), boosting reduces bias (XGBoost). Ensembles outperform single models.', true),
  (t4, 10, 'sandbox', 'mcq', 'Random Forest reduces overfitting compared to a single decision tree by:', '["Using deeper trees","Training on more data","Averaging predictions of many trees trained on random data/feature subsets","Applying L2 regularisation"]', 'Averaging predictions of many trees trained on random data/feature subsets', 'Bagging + random feature selection decorrelates trees. Their average has lower variance than any individual tree.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'sandbox', 'mcq',
    'ML Deep Dive #' || n || ': What is the primary purpose of regularisation in ML?',
    '["Speed up training","Reduce overfitting by penalising model complexity","Increase accuracy on training data","Add more features to the model"]',
    'Reduce overfitting by penalising model complexity', 'Regularisation (L1/L2/dropout) adds a complexity penalty to the loss, discouraging the model from fitting noise.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t4, n, 'sandbox', 'mcq',
    'Expert ML #' || n || ': The VC dimension of a hypothesis class measures:',
    '["Training speed","The capacity/expressiveness — the largest set of points it can shatter","Model size in bytes","Dataset complexity"]',
    'The capacity/expressiveness — the largest set of points it can shatter', 'VC dimension quantifies how many points a model class can perfectly classify in all possible labellings (shattering).', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;


  -- ══════════════════════════════════════════════════════
  --  TOPIC 5: Neural Networks
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t5, 1, 'story', 'mcq', 'A neural network is inspired by:', '["Robots","The human brain","Telephone wires","Magic"]', 'The human brain', 'Neural networks copy how brain neurons connect and pass signals — that is why they are called neural!', true),
  (t5, 2, 'story', 'mcq', 'The tiny computing units inside a neural network are called:', '["Pixels","Neurons","Algorithms","Bytes"]', 'Neurons', 'Just like your brain has billions of neurons, an artificial neural network has artificial neurons that process signals!', true),
  (t5, 3, 'story', 'mcq', 'ARIA''s brain-robot has: a first layer that gets data, middle layers that think, and a last layer that gives the answer. What is the LAST layer called?', '["Input layer","Hidden layer","Output layer","Sort layer"]', 'Output layer', 'The output layer is where the network gives its final answer — like ARIA saying "That is a cat!"', true),
  (t5, 4, 'story', 'mcq', 'ARIA''s brain-robot learns to recognise cats by being:', '["Programmed with exact rules","Shown thousands of cat examples","Told the answer directly every time","Built from scratch each time"]', 'Shown thousands of cat examples', 'Neural networks learn by seeing many examples and adjusting their internal connections — just like how you learn!', true),
  (t5, 5, 'story', 'mcq', 'Which layer of a neural network receives the raw data?', '["Output layer","Hidden layer","Input layer","Middle layer"]', 'Input layer', 'The input layer is the door — raw data (like pixel values) enters the network through it first.', true),
  (t5, 6, 'story', 'mcq', 'Connections between neurons carry:', '["Water","Signals with strength values (weights)","Nothing","Colour information"]', 'Signals with strength values (weights)', 'Each connection has a weight — a number saying how strong or weak the signal is. Learning changes these weights!', true),
  (t5, 7, 'story', 'mcq', 'When ARIA''s robot guesses wrong, it adjusts its connections to do better next time. This process is called:', '["Sorting","Training","Looping","Coding"]', 'Training', 'During training the network makes guesses, checks errors, and tweaks its weights to improve — getting smarter!', true),
  (t5, 8, 'story', 'mcq', 'A neural network with many layers is called a:', '["Wide network","Deep network","Shallow network","Flat network"]', 'Deep network', 'The word "deep" in deep learning means many hidden layers — more layers can learn more complex patterns!', true),
  (t5, 9, 'story', 'mcq', 'The layers between input and output in a neural network are called:', '["Surface layers","Hidden layers","Middle sections","Root layers"]', 'Hidden layers', 'Hidden layers process information in between. They learn to detect patterns that help the output make good predictions!', true),
  (t5, 10, 'story', 'mcq', 'Neural networks are especially good at:', '["Exact calculations only","Recognising patterns in data like images and speech","Writing code","Sorting databases"]', 'Recognising patterns in data like images and speech', 'Neural networks excel at pattern recognition — that is why they power face detection, voice assistants, and more!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'story', 'mcq',
    'Brain Robot Challenge #' || n || ': Which layer of a neural network makes the FINAL decision or prediction?',
    '["Input layer","Hidden layer","Output layer","Error layer"]',
    'Output layer', 'The output layer produces the final answer — the result of all the processing done by the network!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'story', 'mcq',
    'ARIA''s Brain Expert #' || n || ': Deep learning uses networks with MANY hidden layers. What does this help the network learn?',
    '["Makes it simpler","Very complex patterns and features","Uses much less data","Always runs faster"]',
    'Very complex patterns and features', 'More layers = hierarchical feature learning. Early layers detect edges, later layers detect complex shapes and objects!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t5, 1, 'levels', 'mcq', 'What is the purpose of an activation function in a neural network?', '["A training method","Introduces non-linearity — decides whether a neuron fires and how strongly","The loss function","The learning rate schedule"]', 'Introduces non-linearity — decides whether a neuron fires and how strongly', 'Without activation functions, a deep network collapses to a single linear transformation. Activations enable complex mappings.', true),
  (t5, 2, 'levels', 'mcq', 'Which activation function outputs values between 0 and 1, used in binary classification output?', '["ReLU","Tanh","Sigmoid","Softmax"]', 'Sigmoid', 'Sigmoid σ(x) = 1/(1+e^(-x)) squashes values to (0,1), interpretable as probabilities for binary classification.', true),
  (t5, 3, 'levels', 'mcq', 'What does the loss function measure?', '["How fast the network trains","How wrong the model''s predictions are compared to true labels","How to initialise weights","How to select features"]', 'How wrong the model''s predictions are compared to true labels', 'The loss (or cost) function quantifies prediction error. Training aims to minimise this value.', true),
  (t5, 4, 'levels', 'mcq', 'Backpropagation is the algorithm that:', '["Feeds data forward through the network","Calculates gradients of the loss and propagates them backward to update weights","Generates outputs","Normalises input data"]', 'Calculates gradients of the loss and propagates them backward to update weights', 'Backprop uses the chain rule to compute how much each weight contributed to the error, then updates accordingly.', true),
  (t5, 5, 'levels', 'mcq', 'The learning rate controls:', '["Number of neurons","The size of weight updates during gradient descent — too large diverges, too small is slow","Number of layers","Dataset size"]', 'The size of weight updates during gradient descent — too large diverges, too small is slow', 'Learning rate α scales gradient step size: w = w - α·∇L. Choosing the right α is critical for stable training.', true),
  (t5, 6, 'levels', 'mcq', 'A very high learning rate often causes training to:', '["Slow down","Converge perfectly","Diverge — loss oscillates or explodes","Underfit always"]', 'Diverge — loss oscillates or explodes', 'Too-large steps overshoot the loss minimum, causing the loss to bounce around or grow instead of decrease.', true),
  (t5, 7, 'levels', 'mcq', 'A weight in a neural network is:', '["A neuron","A numerical parameter that scales the signal on a connection","The loss value","A layer"]', 'A numerical parameter that scales the signal on a connection', 'Weights determine how much influence one neuron has on the next. Training adjusts weights to minimise loss.', true),
  (t5, 8, 'levels', 'mcq', '"Deep learning" specifically refers to:', '["Training slowly with small data","Using neural networks with many hidden layers","Using only small datasets","Building physical robots"]', 'Using neural networks with many hidden layers', '"Deep" = many hidden layers. Deep networks can learn hierarchical representations — from pixels to objects.', true),
  (t5, 9, 'levels', 'mcq', 'Batch size in training refers to:', '["Network depth","Number of training samples processed before each weight update","The learning rate","Number of layers"]', 'Number of training samples processed before each weight update', 'Mini-batch gradient descent updates weights after processing batch_size examples, balancing speed and stability.', true),
  (t5, 10, 'levels', 'mcq', 'The vanishing gradient problem occurs when:', '["Learning rate is too high","Gradients shrink exponentially during backpropagation, causing early layers to stop learning","The model has too few layers","Data is too small"]', 'Gradients shrink exponentially during backpropagation, causing early layers to stop learning', 'With activations like sigmoid, gradients are multiplied by small numbers at each layer — they vanish in deep nets.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'levels', 'mcq',
    'Neural Network Drill #' || n || ': ReLU activation outputs negative inputs as:',
    '["-1","0","The same negative value","Infinity"]',
    '0', 'ReLU(x) = max(0, x). All negative inputs output 0 — this sparsity helps prevent vanishing gradients.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'levels', 'mcq',
    'Advanced Neural Networks #' || n || ': LSTMs were designed to solve which problem in standard RNNs?',
    '["Overfitting","Vanishing gradient — difficulty learning long-term dependencies","Slow training","Too many parameters"]',
    'Vanishing gradient — difficulty learning long-term dependencies', 'LSTMs use gate mechanisms (forget/input/output) to preserve long-range context that vanilla RNNs lose.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t5, 1, 'sandbox', 'mcq', 'Which activation function is most popular in deep networks and best avoids the vanishing gradient problem?', '["Sigmoid","Tanh","ReLU","Softmax"]', 'ReLU', 'ReLU(x) = max(0,x) has gradient 1 for x>0 — no saturation zone, so gradients do not vanish in positive region.', true),
  (t5, 2, 'sandbox', 'mcq', 'Dropout regularisation works by:', '["Reducing the learning rate adaptively","Randomly zeroing a fraction of neuron activations each forward pass during training","Adding an L2 penalty to the loss","Increasing the batch size"]', 'Randomly zeroing a fraction of neuron activations each forward pass during training', 'Dropout forces the network to learn redundant representations — each neuron cannot rely on others always being present.', true),
  (t5, 3, 'sandbox', 'mcq', 'Batch normalisation normalises:', '["Raw input features only","Layer activations within each mini-batch, then rescales with learned γ and β","Weights to unit variance","Gradients to prevent explosion"]', 'Layer activations within each mini-batch, then rescales with learned γ and β', 'BatchNorm reduces internal covariate shift, allows higher learning rates, and acts as mild regularisation.', true),
  (t5, 4, 'sandbox', 'mcq', 'Softmax is used in:', '["Binary classification output","Multi-class classification output layer — converts logits to a probability distribution","All hidden layers","Regression tasks"]', 'Multi-class classification output layer — converts logits to a probability distribution', 'Softmax(zᵢ) = exp(zᵢ)/Σexp(zⱼ). Outputs sum to 1, interpretable as class probabilities.', true),
  (t5, 5, 'sandbox', 'mcq', 'Why does weight initialisation matter in deep networks?', '["Weights must be exactly zero","Poor initialisation causes vanishing/exploding gradients or dead neurons from the start","Fixed weights prevent overfitting","Large initial weights always converge faster"]', 'Poor initialisation causes vanishing/exploding gradients or dead neurons from the start', 'He init (for ReLU) and Xavier init (for sigmoid/tanh) scale weights to maintain stable gradient magnitudes.', true),
  (t5, 6, 'sandbox', 'mcq', 'Residual (skip) connections in ResNet solve the vanishing gradient problem by:', '["Reducing the number of parameters","Adding the input directly to the layer output, creating a gradient highway","Removing activation functions","Using only pooling"]', 'Adding the input directly to the layer output, creating a gradient highway', 'Skip connections let gradients flow directly to earlier layers: output = F(x) + x, so ∂loss/∂x always receives a gradient of at least 1.', true),
  (t5, 7, 'sandbox', 'mcq', 'Which optimiser adapts the learning rate per-parameter using first and second moment estimates?', '["SGD","RMSProp","Adam","Adagrad"]', 'Adam', 'Adam (Adaptive Moment Estimation) maintains per-parameter moving averages of gradient (m) and squared gradient (v), giving adaptive rates.', true),
  (t5, 8, 'sandbox', 'mcq', 'L1 regularisation tends to produce:', '["Large weights","Sparse weights — many driven to exactly zero","Oscillating loss","Weight explosion"]', 'Sparse weights — many driven to exactly zero', 'L1 penalty (λΣ|w|) creates a non-smooth loss landscape that encourages exact zeros — useful for feature selection.', true),
  (t5, 9, 'sandbox', 'mcq', 'In transfer learning, pre-trained model weights are:', '["Always kept fully frozen","Discarded and randomly reinitialised","Reused as a starting point and optionally fine-tuned on the new task","Only the final layer is reused"]', 'Reused as a starting point and optionally fine-tuned on the new task', 'Pre-trained weights encode useful features (e.g. ImageNet edges/textures). Fine-tuning adapts them cheaply to new domains.', true),
  (t5, 10, 'sandbox', 'mcq', 'The Universal Approximation Theorem states that:', '["Neural networks need infinite layers","A single hidden layer with sufficient neurons can approximate any continuous function on a compact domain","Deep networks always outperform shallow ones","CNNs always beat MLPs on images"]', 'A single hidden layer with sufficient neurons can approximate any continuous function on a compact domain', 'UAT guarantees representational power — but it says nothing about how to find or how many parameters are needed.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'sandbox', 'mcq',
    'Deep Learning Challenge #' || n || ': Exploding gradients during backpropagation are most commonly fixed by:',
    '["Increasing batch size","Gradient clipping — capping gradient norm to a threshold","Adding more layers","Removing dropout"]',
    'Gradient clipping — capping gradient norm to a threshold', 'Gradient clipping rescales gradients when their norm exceeds a threshold, preventing explosive weight updates in RNNs/deep nets.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t5, n, 'sandbox', 'mcq',
    'Expert Neural Networks #' || n || ': Neural Architecture Search (NAS) automates the design of:',
    '["Hyperparameters only (lr, batch size)","The network architecture itself — layers, connections, and operations","Training data pipelines","Inference hardware selection"]',
    'The network architecture itself — layers, connections, and operations', 'NAS uses RL, evolutionary algorithms, or differentiable search to find optimal architectures, replacing hand-design.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

end;
$$;
