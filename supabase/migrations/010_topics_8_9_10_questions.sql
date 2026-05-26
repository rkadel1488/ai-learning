-- 010_topics_8_9_10_questions.sql
-- Seeds 55 questions × 3 tracks for Topic 8 (Data Ethics), Topic 9 (Robotics), Topic 10 (Generative AI)

do $$
declare
  t8  uuid;
  t9  uuid;
  t10 uuid;
begin
  select id into t8  from public.topics where order_index = 8;
  select id into t9  from public.topics where order_index = 9;
  select id into t10 from public.topics where order_index = 10;

  -- ══════════════════════════════════════════════════════
  --  TOPIC 8: Data Ethics & Privacy
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t8, 1, 'story', 'mcq', 'ARIA keeps your name and age secret from strangers. ARIA is protecting your:', '["Password","Privacy","Loop","Algorithm"]', 'Privacy', 'Privacy means keeping personal information safe and only sharing it with people you trust!', true),
  (t8, 2, 'story', 'mcq', 'Is it OK to share someone''s home address online without asking them first?', '["Yes, always","No — that is a privacy violation","Only if it is on a website","Only with robots"]', 'No — that is a privacy violation', 'Sharing someone''s private information without permission is wrong and can be dangerous. Always ask first!', true),
  (t8, 3, 'story', 'mcq', 'ARIA only collects information she NEEDS and nothing extra. This is called:', '["Collecting everything","Data minimisation","Big data","Sorting"]', 'Data minimisation', 'Data minimisation means only collecting what is necessary — not gathering extra personal information just in case!', true),
  (t8, 4, 'story', 'mcq', 'Your school photo is shared online by someone else without asking you. This is:', '["Completely fine","A privacy concern","An algorithm","Normal behaviour"]', 'A privacy concern', 'Sharing photos of people without their permission raises serious privacy concerns — even if the photo is harmless!', true),
  (t8, 5, 'story', 'mcq', 'What should ARIA ALWAYS ask before collecting your personal data?', '["Your favourite colour","Your permission — called consent","Your homework answers","Only your age"]', 'Your permission — called consent', 'Consent means freely agreeing to something after understanding what you are agreeing to. Always required before collecting data!', true),
  (t8, 6, 'story', 'mcq', 'An AI system only recommends top marks to boys and ignores girls equally. Is this fair?', '["Yes, AI is always fair","No — this is AI bias","It depends on the subject","AI cannot be unfair"]', 'No — this is AI bias', 'AI bias happens when a system treats people unfairly due to flawed training data or design. This must be fixed!', true),
  (t8, 7, 'story', 'mcq', 'Who owns your personal information (your name, photo, data)?', '["The government","The company that stored it","You do","Nobody owns it"]', 'You do', 'You own your personal data! Companies must respect your rights and cannot use it however they like without permission.', true),
  (t8, 8, 'story', 'mcq', 'If an AI makes a bad or unfair decision about you, you should be able to:', '["Just accept it","Ask for an explanation and challenge the decision","Never question AI","Report it to a robot"]', 'Ask for an explanation and challenge the decision', 'Everyone has the right to understand and challenge automated decisions that affect them — AI must be accountable!', true),
  (t8, 9, 'story', 'mcq', 'ARIA says: "I will only use your data to help you learn." This written promise is called a:', '["Terms of confusion","Privacy policy","Loop","Bug"]', 'Privacy policy', 'A privacy policy explains how an organisation collects, uses, and protects your data — you have the right to read it!', true),
  (t8, 10, 'story', 'mcq', 'Making sure AI is used safely, fairly, and honestly is part of:', '["Sorting algorithms","Data ethics","Boolean logic","Recursion"]', 'Data ethics', 'Data ethics is about making responsible choices in how we collect, use, and build AI — ensuring it benefits everyone fairly!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'story', 'mcq',
    'ARIA''s Kindness Challenge #' || n || ': A fair AI system should treat all people:',
    '["Differently based on gender","Fairly and equally regardless of background","Only adults fairly","Only people who paid"]',
    'Fairly and equally regardless of background', 'A fair AI treats everyone equitably — regardless of age, gender, race, or background. Fairness is a core AI ethics value!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'story', 'mcq',
    'ARIA''s Ethics Expert #' || n || ': An AI unfairly denying loans to people based on their background is an example of:',
    '["A useful sorting feature","AI bias causing real-world harm","A programming feature","A successful algorithm"]',
    'AI bias causing real-world harm', 'Biased AI in finance, hiring, or justice can cause serious real-world harm — a crucial reason to study AI ethics!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t8, 1, 'levels', 'mcq', 'What is AI bias?', '["When an AI model is too slow","When an AI produces unfair or discriminatory outcomes due to biased data or design","When a model has too many parameters","When training data is unformatted"]', 'When an AI produces unfair or discriminatory outcomes due to biased data or design', 'Bias enters through skewed training data, biased labels, or flawed design — leading to systems that discriminate unfairly.', true),
  (t8, 2, 'levels', 'mcq', 'GDPR (General Data Protection Regulation) is:', '["A programming language","A European regulation giving people rights over their personal data","An AI model architecture","A type of database"]', 'A European regulation giving people rights over their personal data', 'GDPR grants rights to access, correct, and delete personal data. Companies face large fines for non-compliance.', true),
  (t8, 3, 'levels', 'mcq', 'Data anonymisation means:', '["Deleting all data","Removing personally identifiable information so individuals cannot be identified","Encrypting passwords only","Compressing data files"]', 'Removing personally identifiable information so individuals cannot be identified', 'Anonymisation strips names, IDs, and identifying details — the resulting data can be used for research without privacy risks.', true),
  (t8, 4, 'levels', 'mcq', 'Informed consent requires:', '["Data to be collected automatically","Users to voluntarily agree after understanding how their data will be collected and used","Only a cookie pop-up","Just terms of service"]', 'Users to voluntarily agree after understanding how their data will be collected and used', 'Valid consent must be freely given, specific, informed, and unambiguous — a pre-ticked box does not count.', true),
  (t8, 5, 'levels', 'mcq', 'Algorithmic transparency means:', '["All source code is open","People can understand how and why AI systems make decisions that affect them","AI runs on less energy","Less training data is needed"]', 'People can understand how and why AI systems make decisions that affect them', 'Transparency enables accountability — if you cannot explain why a decision was made, it is hard to challenge unfairness.', true),
  (t8, 6, 'levels', 'mcq', 'Facial recognition technology raises significant concerns about:', '["Image file quality","Mass surveillance, erosion of civil liberties, and potential for misuse","Processing speed","Storage costs"]', 'Mass surveillance, erosion of civil liberties, and potential for misuse', 'Without oversight, face recognition enables tracking people without consent — governments and companies have misused it.', true),
  (t8, 7, 'levels', 'mcq', 'The "right to be forgotten" allows people to:', '["Get free internet access","Request deletion of their personal data from systems","Forget their passwords","Turn off AI systems"]', 'Request deletion of their personal data from systems', 'GDPR Article 17 grants the right to erasure — you can ask companies to delete your data under certain conditions.', true),
  (t8, 8, 'levels', 'mcq', 'Training a hiring model on historical data that mostly promoted men will likely produce:', '["A fairer model than humans","A biased model that perpetuates discrimination against women","Faster hiring decisions with no issues","Better accuracy always"]', 'A biased model that perpetuates discrimination against women', 'Historical bias in training data gets encoded in the model — it learns to replicate past discrimination at scale.', true),
  (t8, 9, 'levels', 'mcq', 'Which AI ethics principle states that AI systems should be explainable and their decisions understandable?', '["Autonomy","Transparency / Explainability","Processing speed","Data maximisation"]', 'Transparency / Explainability', 'Explainable AI (XAI) enables users to understand model reasoning — essential for trust, accountability, and fair challenges.', true),
  (t8, 10, 'levels', 'mcq', 'Data sovereignty refers to:', '["Cloud storage capacity","The right of individuals or nations to govern their own data and how it is used","Internet connection speed","Ownership of AI models"]', 'The right of individuals or nations to govern their own data and how it is used', 'Data sovereignty is a growing concern — especially about cross-border data flows and foreign government access.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'levels', 'mcq',
    'Ethics Practice #' || n || ': Which AI ethics principle says AI decisions should be understandable and explainable?',
    '["Autonomy","Transparency","Speed","Data maximisation"]',
    'Transparency', 'Transparency ensures people can understand AI decisions — enabling accountability and fair challenges to automated choices.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'levels', 'mcq',
    'Advanced Ethics #' || n || ': GDPR Article 22 gives EU citizens the right to:',
    '["Free internet access","Know when automated decisions significantly affect them and request human review","Unlimited data storage","Turn off any AI system"]',
    'Know when automated decisions significantly affect them and request human review', 'Article 22 protects against fully automated high-stakes decisions — people have the right to human oversight.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t8, 1, 'sandbox', 'mcq', 'Differential privacy protects individual data by:', '["Deleting identifying fields","Adding calibrated statistical noise so individual records cannot be identified while aggregate statistics remain useful","Full encryption of all data","Anonymising names only"]', 'Adding calibrated statistical noise so individual records cannot be identified while aggregate statistics remain useful', 'DP provides a mathematical privacy guarantee (ε-differential privacy) — queries on the database reveal little about any individual.', true),
  (t8, 2, 'sandbox', 'mcq', 'The fairness criterion requiring equal false positive rates across demographic groups is called:', '["Statistical parity","Equalized odds","Individual fairness","Calibration"]', 'Equalized odds', 'Equalized odds requires equal TPR AND FPR across groups — preventing disparate error rates that disadvantage minorities.', true),
  (t8, 3, 'sandbox', 'mcq', 'Model interpretability is critical in high-stakes domains (medicine, criminal justice) because:', '["It speeds up inference","Decision-makers must be able to understand, validate, and challenge automated decisions","It reduces model size","It prevents overfitting in those domains"]', 'Decision-makers must be able to understand, validate, and challenge automated decisions', 'In high-stakes settings, a "black box" model cannot be trusted or audited — explainability is a legal and ethical requirement.', true),
  (t8, 4, 'sandbox', 'mcq', 'LIME (Local Interpretable Model-agnostic Explanations) explains predictions by:', '["Retraining the full model","Approximating the model''s behaviour locally around a prediction with a simple interpretable model","Visualising all gradients","Adding noise to inputs"]', 'Approximating the model''s behaviour locally around a prediction with a simple interpretable model', 'LIME perturbs the input and fits a local linear model to explain why the black-box model made a specific prediction.', true),
  (t8, 5, 'sandbox', 'mcq', 'Proxy discrimination occurs when:', '["A model is too slow","A feature that correlates with a protected attribute (e.g. postcode with race) is used to discriminate indirectly","The model is too accurate","Training data is too large"]', 'A feature that correlates with a protected attribute (e.g. postcode with race) is used to discriminate indirectly', 'Even without explicitly using race, a model using postcode (correlated with race) can indirectly discriminate.', true),
  (t8, 6, 'sandbox', 'mcq', 'Federated learning addresses privacy by:', '["Centralising all data in one secure server","Training models locally on user devices — only model updates, not raw data, are sent to the server","Encrypting the entire dataset","Using differential privacy alone"]', 'Training models locally on user devices — only model updates, not raw data, are sent to the server', 'Federated learning (e.g. Google Keyboard) trains on-device and aggregates gradients — raw sensitive data never leaves the device.', true),
  (t8, 7, 'sandbox', 'mcq', 'The EU AI Act categorises AI systems by risk level because:', '["To tax AI companies","Different applications pose different levels of risk to rights and safety — requiring proportionate oversight","To slow AI adoption","To make compliance simpler"]', 'Different applications pose different levels of risk to rights and safety — requiring proportionate oversight', 'Unacceptable risk (e.g. social scoring) is banned; high risk (e.g. CV screening) requires conformity assessment; low risk just transparency.', true),
  (t8, 8, 'sandbox', 'mcq', 'Sycophancy in LLMs refers to:', '["Fast inference speed","Models agreeing with users even when factually wrong, prioritising approval over accuracy","Data leakage from training","Hallucination"]', 'Models agreeing with users even when factually wrong, prioritising approval over accuracy', 'Sycophancy is an alignment failure — RLHF trained on human approval can reward models for flattering users over being correct.', true),
  (t8, 9, 'sandbox', 'mcq', 'Saliency maps in CV interpretability reveal:', '["Model training curves","Which input pixels most influenced the model''s prediction — via gradient magnitude","Dataset statistics","Model architecture"]', 'Which input pixels most influenced the model''s prediction — via gradient magnitude', 'Gradient-based saliency (∂output/∂input) highlights pixels the model attends to most — revealing what it "sees".', true),
  (t8, 10, 'sandbox', 'mcq', 'The impossibility theorem of fairness shows that:', '["All fairness metrics can be satisfied simultaneously","Statistical group fairness and individual fairness cannot both be satisfied in most real-world scenarios","Fairness requires infinite data","Only one fairness definition exists"]', 'Statistical group fairness and individual fairness cannot both be satisfied in most real-world scenarios', 'Chouldechova (2017) proved that calibration and equal FPR/FNR cannot coexist when base rates differ across groups.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'sandbox', 'mcq',
    'Ethics Deep Dive #' || n || ': SHAP (SHapley Additive exPlanations) values measure:',
    '["Model inference speed","Each feature''s marginal contribution to a specific prediction, based on cooperative game theory","Total training loss","Dataset feature count"]',
    'Each feature''s marginal contribution to a specific prediction, based on cooperative game theory', 'SHAP uses Shapley values to fairly attribute prediction contributions across all feature subsets — consistent and locally accurate.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t8, n, 'sandbox', 'mcq',
    'Expert Ethics #' || n || ': Group fairness and individual fairness are in tension because:',
    '["They use different programming languages","Statistical equalisation across groups may require treating similarly-situated individuals differently","One requires more data","They use different loss functions"]',
    'Statistical equalisation across groups may require treating similarly-situated individuals differently', 'This core impossibility in fairness theory means practitioners must consciously choose which fairness definition to optimise.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;


  -- ══════════════════════════════════════════════════════
  --  TOPIC 9: Robotics & Automation
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t9, 1, 'story', 'mcq', 'ARIA''s robot uses sensors to:', '["Talk to other robots","Detect and feel its environment","Draw pictures","Count numbers"]', 'Detect and feel its environment', 'Sensors are a robot''s senses — cameras see, microphones hear, touch sensors feel. They help ARIA understand the world!', true),
  (t9, 2, 'story', 'mcq', 'ARIA''s robot moves its arm using:', '["An algorithm","Motors called actuators","Pixels","Loops"]', 'Motors called actuators', 'Actuators are the muscles of a robot — motors, pneumatics, or hydraulics that create movement!', true),
  (t9, 3, 'story', 'mcq', 'A self-driving car uses which sensor to detect obstacles even in total darkness?', '["Camera only","LIDAR (laser scanner)","Microphone","Compass only"]', 'LIDAR (laser scanner)', 'LIDAR fires laser pulses and measures return time to build a 3D map of surroundings — works in darkness unlike cameras!', true),
  (t9, 4, 'story', 'mcq', 'What do we call a robot that helps doctors perform surgery more precisely?', '["A teacher robot","A surgical robot","A sorting robot","A voice robot"]', 'A surgical robot', 'Surgical robots (like da Vinci) let surgeons operate with greater precision and smaller incisions — amazing technology!', true),
  (t9, 5, 'story', 'mcq', 'ARIA''s robot automatically adjusts its grip when an object feels heavier. This automatic adjustment is called:', '["A bug","Feedback control","A loop bug","Random adjustment"]', 'Feedback control', 'Feedback control uses sensor readings to automatically adjust behaviour — like how you tighten your grip on a heavy bag!', true),
  (t9, 6, 'story', 'mcq', 'Automation means:', '["Doing everything by hand","Machines performing repetitive tasks automatically without constant human control","Only robots with AI","Only computer programs"]', 'Machines performing repetitive tasks automatically without constant human control', 'Automation replaces manual repetitive work with machines — from factory assembly lines to dishwashers!', true),
  (t9, 7, 'story', 'mcq', 'A robot on a factory floor that welds car parts automatically is an example of:', '["An AI assistant","Industrial automation","A video game","A sorting algorithm"]', 'Industrial automation', 'Industrial robots automate manufacturing tasks — welding, painting, assembling — with speed and precision!', true),
  (t9, 8, 'story', 'mcq', 'What does a touch sensor on a robot detect?', '["Light levels","Sound","Physical contact or pressure","Temperature only"]', 'Physical contact or pressure', 'Touch sensors detect contact and force — helping robots grasp objects gently or stop when they bump into something!', true),
  (t9, 9, 'story', 'mcq', 'ARIA''s robot vacuum cleaner knows where it has cleaned using:', '["Random movement only","Onboard mapping and sensors","A phone call","Magic"]', 'Onboard mapping and sensors', 'Robot vacuums use sensors and mapping algorithms to track where they have been and navigate efficiently!', true),
  (t9, 10, 'story', 'mcq', 'Programming a robot means giving it:', '["Food and energy only","Precise instructions telling it what to do in different situations","Random signals","Nothing — robots already know everything"]', 'Precise instructions telling it what to do in different situations', 'Robots follow programs — sets of instructions written by engineers that tell them how to behave in every situation!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'story', 'mcq',
    'ARIA''s Robot World #' || n || ': A robot vacuum cleaner that cleans your floor by itself is an example of:',
    '["A video game","Automation at work","A sorting algorithm","A printer"]',
    'Automation at work', 'Automated robots perform tasks like vacuuming without human control — freeing people for more interesting work!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'story', 'mcq',
    'ARIA''s Expert Robot #' || n || ': A robot learns to walk by trying, falling, and getting a reward for balance. This is:',
    '["Supervised learning","Reinforcement learning","Boolean logic","Bubble Sort"]',
    'Reinforcement learning', 'Reinforcement learning trains robots through trial and reward — the robot learns to walk by maximising balance rewards!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t9, 1, 'levels', 'mcq', 'What is the key difference between a robot and pure software automation?', '["Robots are always autonomous","Robots interact with the physical world through sensors and actuators; software automation may be purely digital","Automation requires AI; robots do not","There is no real difference"]', 'Robots interact with the physical world through sensors and actuators; software automation may be purely digital', 'Robots have a physical embodiment — they sense and act in the real world. Automation can be purely virtual (e.g. RPA).', true),
  (t9, 2, 'levels', 'mcq', 'Inverse kinematics in robotics calculates:', '["Battery usage","The joint angles required to position the end-effector at a desired location","Sensor readings","Motor voltages only"]', 'The joint angles required to position the end-effector at a desired location', 'IK works backwards: given a target position (x, y, z), compute the joint angles to reach it — the hard computational problem.', true),
  (t9, 3, 'levels', 'mcq', 'PID controller stands for:', '["Programmable Input Device","Proportional-Integral-Derivative — a control algorithm adjusting output based on current, past, and predicted error","Pixel Identification Detection","None of these"]', 'Proportional-Integral-Derivative — a control algorithm adjusting output based on current, past, and predicted error', 'PID is the most widely used control algorithm — P acts on current error, I eliminates steady-state, D predicts future error.', true),
  (t9, 4, 'levels', 'mcq', 'SLAM (Simultaneous Localisation and Mapping) enables a robot to:', '["Move faster","Build a map of its environment AND track its position within that map at the same time","Detect objects by colour","Sort sensor data"]', 'Build a map of its environment AND track its position within that map at the same time', 'SLAM is core to autonomous navigation — without a pre-built map, the robot must build and localise within it simultaneously.', true),
  (t9, 5, 'levels', 'mcq', 'An articulated robot arm (like in car factories) typically has how many degrees of freedom?', '["1","3","6","12"]', '6', 'A 6-DOF arm can reach any position AND orientation in 3D space — the minimum for full spatial manipulation.', true),
  (t9, 6, 'levels', 'mcq', 'Machine vision in industrial robotics is used for:', '["Robot power management","Quality inspection, part recognition, defect detection, and guided assembly","Communication between robots","Battery charging"]', 'Quality inspection, part recognition, defect detection, and guided assembly', 'Machine vision cameras and AI detect defects, read barcodes, guide robot arms, and inspect products on production lines.', true),
  (t9, 7, 'levels', 'mcq', 'The end-effector on a robot arm is:', '["The motor controller","The base of the arm","The tool at the end — gripper, welder, suction cup, etc.","The power supply"]', 'The tool at the end — gripper, welder, suction cup, etc.', 'The end-effector is what the robot uses to interact with objects. Different tasks need different end-effectors.', true),
  (t9, 8, 'levels', 'mcq', 'ROS (Robot Operating System) is:', '["A desktop OS for robot computers","A middleware framework for robot software — providing messaging, drivers, and tools","A robot brand","A sensor type"]', 'A middleware framework for robot software — providing messaging, drivers, and tools', 'ROS provides a standard communication layer (topics, services, actions) and huge library of packages for robot development.', true),
  (t9, 9, 'levels', 'mcq', 'Teleoperation means:', '["A robot thinks and acts independently","A human controls a robot remotely from a safe distance","Robots communicate with each other","Robots learn from data"]', 'A human controls a robot remotely from a safe distance', 'Teleoperation is used in hazardous environments (nuclear, deep sea, space) where humans cannot safely be present.', true),
  (t9, 10, 'levels', 'mcq', 'A swarm of small robots cooperating to complete a task (like collecting food) demonstrates:', '["Individual AI only","Swarm robotics — emergent collective behaviour from simple local rules","Machine learning","Computer vision"]', 'Swarm robotics — emergent collective behaviour from simple local rules', 'Swarm robotics is inspired by insects like ants and bees. Simple individual rules produce complex collective intelligence.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'levels', 'mcq',
    'Robotics Practice #' || n || ': Which sensor measures distance by emitting sound pulses and measuring echo time?',
    '["Camera","LIDAR","Ultrasonic sensor","GPS"]',
    'Ultrasonic sensor', 'Ultrasonic sensors (like HC-SR04) emit 40kHz pulses and measure return time. d = (t × speed_of_sound) / 2.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'levels', 'mcq',
    'Advanced Robotics #' || n || ': Degrees of freedom (DoF) in a robot arm determines:',
    '["Battery consumption level","The number of independent axes of motion the arm can make","Sensor count on the arm","The weight capacity"]',
    'The number of independent axes of motion the arm can make', 'Each DoF is one independent movement axis. More DoF = more flexibility and dexterity for complex manipulation tasks.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t9, 1, 'sandbox', 'mcq', 'In robotics, the configuration space (C-space) represents:', '["The physical workspace environment","The space of all possible robot configurations (joint angle vectors)","Sensor measurement space","Control signal space"]', 'The space of all possible robot configurations (joint angle vectors)', 'C-space maps every joint angle combination to a point. Path planning in C-space avoids collisions in physical space.', true),
  (t9, 2, 'sandbox', 'mcq', 'A Kalman filter is used in robotics for:', '["Path planning","Optimal state estimation from a sequence of noisy measurements using a predict-update cycle","Motor control directly","Object recognition"]', 'Optimal state estimation from a sequence of noisy measurements using a predict-update cycle', 'Kalman filter is the BLUE estimator for linear Gaussian systems. The Extended KF handles non-linear robot dynamics.', true),
  (t9, 3, 'sandbox', 'mcq', 'Forward kinematics computes:', '["Joint angles from a desired position (IK)","End-effector pose (position + orientation) given all joint angles","Trajectory between waypoints","Sensor fusion"]', 'End-effector pose (position + orientation) given all joint angles', 'FK uses the Denavit-Hartenberg transformation chain: T = T₁·T₂·...·Tₙ from base frame to end-effector frame.', true),
  (t9, 4, 'sandbox', 'mcq', 'Model Predictive Control (MPC) improves on PID by:', '["Being simpler to tune","Planning a sequence of control actions over a future horizon while respecting constraints","Using only current error","Running faster on all hardware"]', 'Planning a sequence of control actions over a future horizon while respecting constraints', 'MPC solves an optimisation problem at each timestep over a receding horizon — handling constraints and multi-variable systems.', true),
  (t9, 5, 'sandbox', 'mcq', 'In reinforcement learning for robotics, the reward function defines:', '["The robot''s physical structure","What behaviour is desired — the agent maximises cumulative reward over time","The sensor inputs","The control limits"]', 'What behaviour is desired — the agent maximises cumulative reward over time', 'Reward shaping is critical and hard — a poorly designed reward causes unexpected behaviour (reward hacking).', true),
  (t9, 6, 'sandbox', 'mcq', 'ROS 2 improved on ROS 1 mainly by:', '["Being simpler to use","Adding DDS-based real-time communication, security, and native multi-robot support","Removing the middleware layer","Using Python only"]', 'Adding DDS-based real-time communication, security, and native multi-robot support', 'ROS 2 uses DDS (Data Distribution Service) for decentralised, real-time, and secure robot communication — production-ready.', true),
  (t9, 7, 'sandbox', 'mcq', 'The A* path planning algorithm finds:', '["Any path, not necessarily optimal","The optimal (shortest) path from start to goal using heuristic-guided search","Only paths in 2D","Only straight-line paths"]', 'The optimal (shortest) path from start to goal using heuristic-guided search', 'A* combines Dijkstra (optimal) with a heuristic (greedy). With an admissible heuristic, it guarantees the shortest path.', true),
  (t9, 8, 'sandbox', 'mcq', 'Sim-to-real transfer in robot learning addresses:', '["Improving simulation rendering","The performance gap when policies trained in simulation are deployed on real hardware","Reducing training time","Hardware cost reduction"]', 'The performance gap when policies trained in simulation are deployed on real hardware', 'Simulation physics and real sensors/dynamics differ — domain randomisation and adaptation techniques bridge this gap.', true),
  (t9, 9, 'sandbox', 'mcq', 'LIDAR works by:', '["Capturing photographic images","Emitting laser pulses and measuring time-of-flight to compute distances, building a 3D point cloud","Using ultrasound pulses","Measuring magnetic fields"]', 'Emitting laser pulses and measuring time-of-flight to build a 3D point cloud', 'LIDAR (Light Detection And Ranging) fires thousands of laser pulses per second and measures return time — d = c·t/2.', true),
  (t9, 10, 'sandbox', 'mcq', 'In grasp planning, force closure ensures:', '["Maximum grip force","The gripper can apply forces and torques to resist any external wrench applied to the object","Minimum energy use","Fastest grasp speed"]', 'The gripper can apply forces and torques to resist any external wrench applied to the object', 'Force closure analysis considers contact geometry, friction cones, and torque balance — ensuring a stable, controllable grasp.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'sandbox', 'mcq',
    'Robotics Advanced #' || n || ': In a PID controller, the Integral term specifically addresses:',
    '["Current position error","Rate of change of error","Accumulated past error — eliminating steady-state offset that P alone cannot fix","Predicted future error"]',
    'Accumulated past error — eliminating steady-state offset that P alone cannot fix', 'The I term sums error over time. Without it, a P-only controller maintains a steady-state offset. I term drives this to zero.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t9, n, 'sandbox', 'mcq',
    'Expert Robotics #' || n || ': Grasp planning must consider which three key factors for a stable grasp?',
    '["Speed, weight, and colour","Object geometry, friction coefficients, and force closure conditions","Battery level, sensor count, and speed","Weight, temperature, and material"]',
    'Object geometry, friction coefficients, and force closure conditions', 'A valid grasp requires contact points on the geometry that, with given friction, can resist all possible external disturbances.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;


  -- ══════════════════════════════════════════════════════
  --  TOPIC 10: Generative AI
  -- ══════════════════════════════════════════════════════

  -- ── STORY TRACK (ages 6-10) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t10, 1, 'story', 'mcq', 'ARIA creates a brand new story by herself that nobody wrote before. This is an example of:', '["Machine learning","Generative AI","Computer vision","Sorting"]', 'Generative AI', 'Generative AI creates new content — stories, images, music — based on patterns it learned from existing content!', true),
  (t10, 2, 'story', 'mcq', 'ARIA draws a brand new picture that does not exist anywhere. This is called:', '["Data sorting","AI image generation","Boolean programming","Debugging"]', 'AI image generation', 'AI image generators like DALL-E create unique images from text descriptions — a form of generative AI!', true),
  (t10, 3, 'story', 'mcq', 'When you ask ARIA a question and she writes a full answer, ARIA is:', '["Searching the internet","Generating text","Sorting data","Drawing a map"]', 'Generating text', 'ARIA generates text one word at a time, predicting what comes next based on what she has learned!', true),
  (t10, 4, 'story', 'mcq', 'A "prompt" you give to an AI is:', '["A mistake in the AI","Your instruction or description telling the AI what to create","A computer virus","A type of sensor"]', 'Your instruction or description telling the AI what to create', 'A prompt is your input to the AI — the clearer and more detailed your prompt, the better the AI''s output!', true),
  (t10, 5, 'story', 'mcq', 'ARIA writes a poem she has never seen before. Is this really possible with AI?', '["No — AI can only copy existing poems","Yes — generative AI can create genuinely new content","Only if a human wrote it first","Only for maths poems"]', 'Yes — generative AI can create genuinely new content', 'Generative AI creates novel content by combining patterns from training — it does not just copy but generates something new!', true),
  (t10, 6, 'story', 'mcq', 'Which of these is a real example of generative AI?', '["A calculator","ChatGPT writing a story or essay","A quiz app with fixed answers","A sorting program"]', 'ChatGPT writing a story or essay', 'ChatGPT is a large language model that generates text — it creates new responses for every question, not from a fixed list!', true),
  (t10, 7, 'story', 'mcq', 'If AI creates fake videos of real people doing things they never did, these are called:', '["Filters","Deepfakes","Pixels","Cartoons"]', 'Deepfakes', 'Deepfakes use AI (often GANs) to create convincing fake videos or images — a serious ethical concern!', true),
  (t10, 8, 'story', 'mcq', 'A good prompt gives the AI:', '["As little information as possible","One single word only","Clear, detailed instructions about what to create","Nothing — AI figures it out"]', 'Clear, detailed instructions about what to create', 'Better prompts = better results. Describing style, length, tone, and context helps the AI generate exactly what you need!', true),
  (t10, 9, 'story', 'mcq', 'Generative AI learns to create by:', '["Being hand-coded every single time","Studying millions of examples of human-created content","Asking users questions","Using only sorting algorithms"]', 'Studying millions of examples of human-created content', 'Generative AI learns patterns from vast amounts of text, images, or audio — then creates new content following those patterns!', true),
  (t10, 10, 'story', 'mcq', 'What should you ALWAYS do when AI gives you a fact or piece of information?', '["Trust it completely — AI is always right","Check whether it is accurate and true using a reliable source","Only check the spelling","Only read the first sentence"]', 'Check whether it is accurate and true using a reliable source', 'AI can "hallucinate" — confidently stating things that are wrong. Always verify important facts with trusted sources!', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'story', 'mcq',
    'ARIA Creates! #' || n || ': When AI writes a new story from your description, it is using:',
    '["Sorting algorithms","Generative AI","Boolean logic only","A calculator"]',
    'Generative AI', 'Generative AI creates brand-new content — stories, art, music — based on patterns learned from human creations!', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'story', 'mcq',
    'ARIA''s GenAI Expert #' || n || ': What should you ALWAYS check when AI gives you information?',
    '["Nothing — AI is always right","Whether it is accurate and truthful","Only the grammar","The font used"]',
    'Whether it is accurate and truthful', 'AI can hallucinate false facts confidently — always verify important information with reliable, trusted sources!', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── LEVELS TRACK (ages 11-15) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t10, 1, 'levels', 'mcq', 'A Large Language Model (LLM) generates text by:', '["Searching a database of pre-written responses","Predicting the next token based on the previous context","Copying and pasting from training data","Using a rule-based template"]', 'Predicting the next token based on the previous context', 'LLMs are autoregressive — they generate one token at a time, each prediction conditioned on all previous tokens.', true),
  (t10, 2, 'levels', 'mcq', 'A "prompt" in generative AI is:', '["A programming function","The input text or instruction you give to guide the AI''s output","An error message","A training dataset sample"]', 'The input text or instruction you give to guide the AI''s output', 'The prompt is your communication with the model — well-crafted prompts produce much better results (prompt engineering).', true),
  (t10, 3, 'levels', 'mcq', 'A Generative Adversarial Network (GAN) consists of:', '["Encoder and Decoder networks","Generator and Discriminator competing against each other","Input and Output layers only","Teacher and Student models"]', 'Generator and Discriminator competing against each other', 'The generator creates fake data; the discriminator judges real vs fake. Competition drives both to improve.', true),
  (t10, 4, 'levels', 'mcq', 'Temperature in LLM text generation controls:', '["Processing speed","The randomness and creativity of outputs — higher temperature = more varied/creative","Model size","Context window length"]', 'The randomness and creativity of outputs — higher temperature = more varied/creative', 'Temperature scales the logits before softmax. Low temp → deterministic/conservative; high temp → creative/unpredictable.', true),
  (t10, 5, 'levels', 'mcq', 'Which is a significant risk of generative AI?', '["Faster calculations","Generating confident but factually incorrect information (hallucinations)","Better data sorting","Fewer model parameters"]', 'Generating confident but factually incorrect information (hallucinations)', 'LLMs can hallucinate — stating false facts with high confidence. This is a serious problem in medical, legal, and news contexts.', true),
  (t10, 6, 'levels', 'mcq', 'Diffusion models generate images by:', '["Drawing pixel by pixel from top-left","Gradually denoising from pure random noise back to a coherent image","Using convolutions only","Copying and modifying training images"]', 'Gradually denoising from pure random noise back to a coherent image', 'Diffusion models (Stable Diffusion, DALL-E 3) learn to reverse a noise process — adding meaning to noise step by step.', true),
  (t10, 7, 'levels', 'mcq', 'Prompt engineering is the skill of:', '["Building the AI model from scratch","Crafting effective input prompts to get the desired output from AI","Training the model on new data","Deploying AI on servers"]', 'Crafting effective input prompts to get the desired output from AI', 'Good prompts include clear instructions, examples, context, and format specifications — dramatically improving AI output quality.', true),
  (t10, 8, 'levels', 'mcq', 'Fine-tuning a generative model means:', '["Training it from random weights on a huge dataset","Adapting a pre-trained model to a specific task using additional targeted data","Removing model parameters","Adding physical sensors"]', 'Adapting a pre-trained model to a specific task using additional targeted data', 'Fine-tuning continues training on task-specific data (e.g. medical Q&A) — much cheaper than training from scratch.', true),
  (t10, 9, 'levels', 'mcq', 'DALL-E and Stable Diffusion are examples of:', '["Large language models","AI image generation models","Robotics systems","Search engine algorithms"]', 'AI image generation models', 'DALL-E (OpenAI) and Stable Diffusion generate images from text descriptions — powerful multimodal generative AI!', true),
  (t10, 10, 'levels', 'mcq', 'The "hallucination" problem in LLMs refers to:', '["The model being too slow","Generating confident but factually wrong information","The model crashing during inference","Severe overfitting to training data"]', 'Generating confident but factually wrong information', 'LLMs are trained to produce fluent, plausible text — not necessarily accurate text. They can invent facts convincingly.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'levels', 'mcq',
    'GenAI Practice #' || n || ': "Few-shot prompting" means:',
    '["Training the model on very few examples","Providing a few input-output examples in the prompt to show the model the desired format","Using a smaller model","Lowering the temperature setting"]',
    'Providing a few input-output examples in the prompt to show the model the desired format', 'Few-shot prompting includes example pairs in the context — the model infers the task pattern without any weight updates.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'levels', 'mcq',
    'Advanced GenAI #' || n || ': "Top-p" (nucleus) sampling restricts token selection to:',
    '["The single highest probability token","The top p tokens by count","Tokens whose cumulative probability reaches p — balancing diversity and quality","All tokens equally"]',
    'Tokens whose cumulative probability reaches p — balancing diversity and quality', 'Top-p only samples from the smallest token set whose cumulative probability ≥ p — avoiding both boring and nonsensical outputs.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

  -- ── SANDBOX TRACK (ages 16-20) ──
  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free) values
  (t10, 1, 'sandbox', 'mcq', 'The Transformer architecture underpinning LLMs relies primarily on:', '["Recurrent connections for sequence modelling","Self-attention mechanisms operating over all token positions simultaneously","Convolutional filters over token windows","Decision tree ensembles"]', 'Self-attention mechanisms operating over all token positions simultaneously', 'Transformers process the whole sequence in parallel via self-attention — no sequential bottleneck, enabling scale.', true),
  (t10, 2, 'sandbox', 'mcq', 'RLHF (Reinforcement Learning from Human Feedback) aligns LLMs by:', '["Pre-training on larger web corpora","Training a reward model on human preference rankings, then using PPO to fine-tune the LLM toward higher reward","Removing harmful training data","Adding hard-coded rules"]', 'Training a reward model on human preference rankings, then using PPO to fine-tune the LLM toward higher reward', 'RLHF is the core alignment technique for ChatGPT/Claude — humans rank outputs, a reward model learns preferences, PPO optimises the LLM.', true),
  (t10, 3, 'sandbox', 'mcq', 'Constitutional AI (CAI) trains models using:', '["Supervised labels from humans only","A set of written principles — the model critiques and revises its own outputs against the constitution","Random sampling of outputs","Contrastive self-supervised learning"]', 'A set of written principles — the model critiques and revises its own outputs against the constitution', 'Anthropic''s CAI uses AI feedback guided by a constitution — reducing reliance on human labellers for harmlessness training.', true),
  (t10, 4, 'sandbox', 'mcq', 'Classifier-Free Guidance (CFG) in diffusion models:', '["Reduces generation quality","Amplifies the conditioning signal by extrapolating between conditional and unconditional predictions","Speeds up sampling by 10×","Replaces the discriminator in GANs"]', 'Amplifies the conditioning signal by extrapolating between conditional and unconditional predictions', 'CFG: ε_guided = ε_unconditional + s·(ε_conditional - ε_unconditional). Higher guidance scale s → stronger prompt adherence.', true),
  (t10, 5, 'sandbox', 'mcq', 'The KV (Key-Value) cache in LLM inference:', '["Stores training examples","Caches computed Key and Value tensors for past tokens so they are not recomputed in each new generation step","Compresses model weights","Reduces hallucinations"]', 'Caches computed Key and Value tensors for past tokens so they are not recomputed in each new generation step', 'Without KV cache, each token generation re-processes the full context — O(n²) total. Caching makes it O(n) per new token.', true),
  (t10, 6, 'sandbox', 'mcq', 'LoRA (Low-Rank Adaptation) fine-tunes LLMs by:', '["Full parameter retraining — updating all weights","Freezing the base model and adding small trainable rank-decomposition matrices ΔW = A·B to specific layers","Pruning existing weights","Increasing model size with new layers"]', 'Freezing the base model and adding small trainable rank-decomposition matrices ΔW = A·B to specific layers', 'LoRA trains only A and B (rank r << d) — orders of magnitude fewer parameters than full fine-tuning, enabling low-cost adaptation.', true),
  (t10, 7, 'sandbox', 'mcq', 'In a GAN, the discriminator is trained to:', '["Generate realistic synthetic samples","Classify inputs as real (from training data) or fake (from generator)","Minimise the generation loss directly","Encode inputs into latent space"]', 'Classify inputs as real (from training data) or fake (from generator)', 'Discriminator loss: -E[log D(x)] - E[log(1-D(G(z)))]. Generator wins when discriminator cannot distinguish real from fake.', true),
  (t10, 8, 'sandbox', 'mcq', 'Retrieval-Augmented Generation (RAG) reduces hallucinations by:', '["Training a larger base model","Retrieving relevant documents from a vector store and injecting them into the context at inference","Fine-tuning with higher temperature","Using a smaller context window"]', 'Retrieving relevant documents from a vector store and injecting them into the context at inference', 'RAG grounds generation in retrieved evidence — the model can cite sources and is less likely to fabricate facts.', true),
  (t10, 9, 'sandbox', 'mcq', 'Speculative decoding speeds up LLM inference by:', '["Reducing model depth","Using a small draft model to generate candidate tokens, verified in parallel by the large model","Caching all possible outputs","Reducing vocabulary size"]', 'Using a small draft model to generate candidate tokens, verified in parallel by the large model', 'The small model drafts k tokens cheaply; the large model verifies all k in one forward pass — 2-3× speedup with identical output quality.', true),
  (t10, 10, 'sandbox', 'mcq', 'Chain-of-thought (CoT) prompting improves LLM reasoning by:', '["Reducing output token count","Instructing the model to show intermediate reasoning steps before giving the final answer","Adding noise to the prompt","Using higher temperature"]', 'Instructing the model to show intermediate reasoning steps before giving the final answer', 'CoT ("let''s think step by step") dramatically improves multi-step reasoning — the model self-conditions on correct intermediate steps.', true)
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'sandbox', 'mcq',
    'GenAI Advanced #' || n || ': What problem does Flash Attention solve in Transformer training?',
    '["Weight initialisation","O(n²) memory footprint of standard attention by using IO-aware tiling on GPU SRAM","Gradient vanishing in deep networks","Tokenization vocabulary size"]',
    'O(n²) memory footprint of standard attention by using IO-aware tiling on GPU SRAM', 'Flash Attention computes exact attention in O(n) memory by tiling the Q·Kᵀ computation — enabling much longer context windows.', true
  from generate_series(11, 50) as n
  on conflict (topic_id, order_index, track) do nothing;

  insert into public.questions (topic_id, order_index, track, type, prompt, options, correct_answer, explanation, is_free)
  select t10, n, 'sandbox', 'mcq',
    'Expert GenAI #' || n || ': "Emergence" in large language models refers to:',
    '["Improved inference speed at scale","Capabilities that appear only above a certain scale threshold — not predictable from smaller model behaviour","Reduced hallucinations at scale","Faster tokenization"]',
    'Capabilities that appear only above a certain scale threshold — not predictable from smaller model behaviour', 'Emergent abilities (reasoning, code, multi-step arithmetic) appear suddenly at certain parameter counts — a key open research question.', false
  from generate_series(51, 55) as n
  on conflict (topic_id, order_index, track) do nothing;

end;
$$;
