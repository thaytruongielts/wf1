import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types & Data ---

type WordFormType = 'verb' | 'nounPerson' | 'nounConcept' | 'adjective' | 'adverb';

interface WordFamily {
  id: number;
  verb: string;
  nounPerson: string;
  nounConcept: string;
  adjective: string;
  adverb: string;
}

// New dataset from user request (F-Y)
const wordData: WordFamily[] = [
  { id: 1, adjective: 'Failed', nounPerson: '', nounConcept: 'Failure', verb: 'Fail', adverb: '' },
  { id: 2, adjective: 'Fair', nounPerson: '', nounConcept: 'Fairness', verb: '', adverb: 'Fairly' },
  { id: 3, adjective: 'Faithful', nounPerson: '', nounConcept: 'Faith', verb: '', adverb: 'Faithfully' },
  { id: 4, adjective: 'Famous', nounPerson: '', nounConcept: 'Fame', verb: '', adverb: 'Famously' },
  { id: 5, adjective: 'Fascinating', nounPerson: 'Fascinator', nounConcept: 'Fascination', verb: 'Fascinate', adverb: '' },
  { id: 6, adjective: 'Fast', nounPerson: '', nounConcept: 'Fastness', verb: '', adverb: 'Fast' },
  { id: 7, adjective: 'Final', nounPerson: '', nounConcept: 'Finalization', verb: 'Finalize', adverb: 'Finally' },
  { id: 8, adjective: 'Foreign', nounPerson: 'Foreigner', nounConcept: '', verb: 'Foreignize', adverb: '' },
  { id: 9, adjective: 'Forgetful', nounPerson: '', nounConcept: 'Forgetfulness', verb: 'Forget', adverb: '' },
  { id: 10, adjective: 'Formal', nounPerson: '', nounConcept: 'Formality', verb: 'Formalize', adverb: 'Formally' },
  { id: 11, adjective: 'Fortunate', nounPerson: '', nounConcept: 'Fortune', verb: '', adverb: 'Fortunately' },
  { id: 12, adjective: 'Free', nounPerson: '', nounConcept: 'Freedom', verb: 'Free', adverb: 'Freely' },
  { id: 13, adjective: 'Frequent', nounPerson: '', nounConcept: 'Frequency', verb: '', adverb: 'Frequently' },
  { id: 14, adjective: 'Fresh', nounPerson: '', nounConcept: 'Freshness', verb: 'Freshen', adverb: 'Freshly' },
  { id: 15, adjective: 'Generous', nounPerson: '', nounConcept: 'Generosity', verb: '', adverb: 'Generously' },
  { id: 16, adjective: 'Gentle', nounPerson: '', nounConcept: 'Gentleness', verb: '', adverb: 'Gently' },
  { id: 17, adjective: 'Glorious', nounPerson: '', nounConcept: 'Glory', verb: '', adverb: 'Gloriously' },
  { id: 18, adjective: 'Good', nounPerson: '', nounConcept: 'Goodness', verb: '', adverb: 'Well' },
  { id: 19, adjective: 'Greedy', nounPerson: '', nounConcept: 'Greed / Greediness', verb: '', adverb: 'Greedily' },
  { id: 20, adjective: 'Habitual', nounPerson: '', nounConcept: 'Habit', verb: '', adverb: 'Habitually' },
  { id: 21, adjective: 'Handicapped', nounPerson: 'Handicapper', nounConcept: 'Handicap', verb: '', adverb: '' },
  { id: 22, adjective: 'Hard', nounPerson: '', nounConcept: 'Hardness', verb: 'Harden', adverb: 'Hardly' },
  { id: 23, adjective: 'Healthy', nounPerson: '', nounConcept: 'Health', verb: '', adverb: 'Healthily' },
  { id: 24, adjective: 'Hearty', nounPerson: '', nounConcept: 'Heart', verb: '', adverb: 'Heartily' },
  { id: 25, adjective: 'Honest', nounPerson: '', nounConcept: 'Honesty', verb: '', adverb: 'Honestly' },
  { id: 26, adjective: 'Honorable', nounPerson: '', nounConcept: 'Honor', verb: 'Honor', adverb: 'Honorably' },
  { id: 27, adjective: 'Horrible', nounPerson: '', nounConcept: 'Horribleness', verb: '', adverb: 'Horribly' },
  { id: 28, adjective: 'Humane', nounPerson: 'Humanist', nounConcept: 'Humanity', verb: 'Humanize', adverb: 'Humanly' },
  { id: 29, adjective: 'Humorous', nounPerson: 'Humorist', nounConcept: 'Humor', verb: '', adverb: '' },
  { id: 30, adjective: 'Hungry', nounPerson: '', nounConcept: 'Hunger', verb: '', adverb: 'Hungrily' },
  { id: 31, adjective: 'Hurtful', nounPerson: '', nounConcept: 'Hurt', verb: 'Hurt', adverb: '' },
  { id: 32, adjective: 'Identical', nounPerson: '', nounConcept: 'Identification', verb: 'Identify', adverb: 'Identically' },
  { id: 33, adjective: 'Imaginary', nounPerson: '', nounConcept: 'Imagination', verb: 'Imagine', adverb: '' },
  { id: 34, adjective: 'Immediate', nounPerson: '', nounConcept: 'Immediacy', verb: '', adverb: 'Immediately' },
  { id: 35, adjective: 'Impressive', nounPerson: '', nounConcept: 'Impression', verb: 'Impress', adverb: 'Impressively' },
  { id: 36, adjective: 'Intelligent', nounPerson: '', nounConcept: 'Intelligence', verb: '', adverb: 'Intelligently' },
  { id: 37, adjective: 'Laughable', nounPerson: 'Laugher', nounConcept: 'Laughter', verb: 'Laugh', adverb: '' },
  { id: 38, adjective: 'Lucky', nounPerson: '', nounConcept: 'Luck', verb: '', adverb: 'Luckily' },
  { id: 39, adjective: 'Magical', nounPerson: 'Magician', nounConcept: 'Magic', verb: '', adverb: 'Magically' },
  { id: 40, adjective: 'Modern', nounPerson: '', nounConcept: 'Modernization', verb: 'Modernize', adverb: 'Modernly' },
  { id: 41, adjective: 'Natural', nounPerson: '', nounConcept: 'Nature', verb: 'Naturalize', adverb: 'Naturally' },
  { id: 42, adjective: 'Noisy', nounPerson: '', nounConcept: 'Noise', verb: '', adverb: 'Noisily' },
  { id: 43, adjective: 'Nominative', nounPerson: 'Nominee', nounConcept: 'Nomination', verb: 'Nominate', adverb: '' },
  { id: 44, adjective: 'Original', nounPerson: 'Originator', nounConcept: 'Origin', verb: 'Originate', adverb: 'Originally' },
  { id: 45, adjective: 'Perfect', nounPerson: '', nounConcept: 'Perfection', verb: 'Perfect', adverb: 'Perfectly' },
  { id: 46, adjective: 'Questionable', nounPerson: 'Questioner', nounConcept: 'Question', verb: 'Question', adverb: 'Questioningly' },
  { id: 47, adjective: 'Regular', nounPerson: '', nounConcept: '', verb: '', adverb: 'Regularly' },
  { id: 48, adjective: 'Safe', nounPerson: '', nounConcept: 'Safety', verb: '', adverb: 'Safely' },
  { id: 49, adjective: 'Satisfactory', nounPerson: '', nounConcept: 'Satisfaction', verb: 'Satisfy', adverb: 'Satisfactorily' },
  { id: 50, adjective: 'Short', nounPerson: '', nounConcept: 'Shortage', verb: 'Shorten', adverb: 'Shortly' },
  { id: 51, adjective: 'Sick', nounPerson: '', nounConcept: 'Sickness', verb: 'Sicken', adverb: 'Sickly' },
  { id: 52, adjective: 'Simple', nounPerson: '', nounConcept: 'Simplicity', verb: 'Simplify', adverb: 'Simply' },
  { id: 53, adjective: 'Sleepy', nounPerson: 'Sleeper', nounConcept: 'Sleep', verb: 'Sleep', adverb: 'Sleepily' },
  { id: 54, adjective: 'Social', nounPerson: 'Socialist', nounConcept: 'Society', verb: 'Socialize', adverb: 'Socially' },
  { id: 55, adjective: 'Soft', nounPerson: '', nounConcept: 'Softness', verb: 'Soften', adverb: 'Softly' },
  { id: 56, adjective: 'Strong', nounPerson: '', nounConcept: 'Strength', verb: 'Strengthen', adverb: 'Strongly' },
  { id: 57, adjective: 'Sudden', nounPerson: '', nounConcept: 'Suddenness', verb: '', adverb: 'Suddenly' },
  { id: 58, adjective: 'Terrible', nounPerson: '', nounConcept: '', verb: 'Terrify', adverb: 'Terribly' },
  { id: 59, adjective: 'Thankful', nounPerson: '', nounConcept: 'Thankfulness', verb: 'Thank', adverb: 'Thankfully' },
  { id: 60, adjective: 'Thick', nounPerson: '', nounConcept: 'Thickness', verb: 'Thicken', adverb: 'Thickly' },
  { id: 61, adjective: 'Thin', nounPerson: '', nounConcept: 'Thinness', verb: 'Thin', adverb: 'Thinly' },
  { id: 62, adjective: 'Thoughtful', nounPerson: 'Thinker', nounConcept: 'Thought', verb: 'Think', adverb: 'Thoughtfully' },
  { id: 63, adjective: 'Traditional', nounPerson: '', nounConcept: 'Tradition', verb: 'Traditionalize', adverb: 'Traditionally' },
  { id: 64, adjective: 'True', nounPerson: '', nounConcept: 'Truth', verb: '', adverb: 'Truly' },
  { id: 65, adjective: 'Understandable', nounPerson: '', nounConcept: 'Understanding', verb: 'Understand', adverb: '' },
  { id: 66, adjective: 'Useful', nounPerson: '', nounConcept: 'Use', verb: 'Use', adverb: 'Usefully' },
  { id: 67, adjective: 'Valuable', nounPerson: 'Valuator / Valuer', nounConcept: 'Value', verb: 'Value', adverb: '' },
  { id: 68, adjective: 'Various', nounPerson: '', nounConcept: 'Variety', verb: 'Vary', adverb: 'Variously' },
  { id: 69, adjective: 'Warm', nounPerson: '', nounConcept: 'Warmness', verb: 'Warm', adverb: 'Warmly' },
  { id: 70, adjective: 'Weak', nounPerson: '', nounConcept: 'Weakness', verb: 'Weaken', adverb: 'Weakly' },
  { id: 71, adjective: 'Wide', nounPerson: '', nounConcept: 'Widening', verb: 'Widen', adverb: 'Widely' },
  { id: 72, adjective: 'Wise', nounPerson: '', nounConcept: 'Wisdom', verb: '', adverb: 'Wisely' },
  { id: 73, adjective: 'Wonderful', nounPerson: '', nounConcept: 'Wonder', verb: 'Wonder', adverb: 'Wonderfully' },
  { id: 74, adjective: 'Young', nounPerson: 'Youngster', nounConcept: 'Youth', verb: '', adverb: 'Youthfully' }
];

// Helper to normalize strings for comparison
const normalize = (str: string) => str.trim().toLowerCase();

const LABELS: Record<WordFormType, string> = {
  verb: 'Verb (Động từ)',
  nounPerson: 'Noun - Person (Người)',
  nounConcept: 'Noun - Concept (Vật/Khái niệm)',
  adjective: 'Adjective (Tính từ)',
  adverb: 'Adverb (Trạng từ)',
};

const FORMS: WordFormType[] = ['verb', 'nounPerson', 'nounConcept', 'adjective', 'adverb'];

// --- Components ---

const App: React.FC = () => {
  // Game State
  const [currentWord, setCurrentWord] = useState<WordFamily | null>(null);
  const [givenType, setGivenType] = useState<WordFormType>('verb');
  const [inputs, setInputs] = useState<Record<WordFormType, string>>({
    verb: '', nounPerson: '', nounConcept: '', adjective: '', adverb: ''
  });
  
  // Progress State
  const [usedIds, setUsedIds] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Validation State
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<WordFormType, boolean>>({
    verb: false, nounPerson: false, nounConcept: false, adjective: false, adverb: false
  });

  // Score State
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Initialize first word
  useEffect(() => {
    // Only pick if we haven't started yet
    if (usedIds.length === 0 && !isFinished && !currentWord) {
        pickNewWord();
    }
  }, []);

  const pickNewWord = () => {
    // Filter words that haven't been used yet
    const availableWords = wordData.filter(w => !usedIds.includes(w.id));
    
    if (availableWords.length === 0) {
      setIsFinished(true);
      setCurrentWord(null);
      return;
    }

    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    
    // Find a valid type (one that isn't empty) to present to the user
    let randomType: WordFormType;
    let attempts = 0;
    do {
       randomType = FORMS[Math.floor(Math.random() * FORMS.length)];
       attempts++;
    } while (!randomWord[randomType] && attempts < 20); // Fallback to avoid infinite loop if all empty (unlikely)

    // If we somehow failed to find a non-empty field, just pick the first non-empty one
    if (!randomWord[randomType]) {
        const validForm = FORMS.find(f => !!randomWord[f]);
        if (validForm) randomType = validForm;
    }

    setCurrentWord(randomWord);
    setGivenType(randomType);
    
    // Add current word ID to used list
    setUsedIds(prev => [...prev, randomWord.id]);
    
    // Reset inputs
    const newInputs = {
      verb: '', nounPerson: '', nounConcept: '', adjective: '', adverb: ''
    };
    newInputs[randomType] = randomWord[randomType];
    setInputs(newInputs);
    
    // Reset state
    setChecked(false);
    setResults({
      verb: false, nounPerson: false, nounConcept: false, adjective: false, adverb: false
    });
  };

  const handleRestart = () => {
    // Reset all game state
    setUsedIds([]);
    setTotalQuestions(0);
    setTotalCorrect(0);
    setIsFinished(false);
    
    // We need to pick a word immediately
    const randomWord = wordData[Math.floor(Math.random() * wordData.length)];
    
    let randomType: WordFormType;
    let attempts = 0;
    do {
       randomType = FORMS[Math.floor(Math.random() * FORMS.length)];
       attempts++;
    } while (!randomWord[randomType] && attempts < 20);

     if (!randomWord[randomType]) {
        const validForm = FORMS.find(f => !!randomWord[f]);
        if (validForm) randomType = validForm;
    }

    setCurrentWord(randomWord);
    setGivenType(randomType);
    setUsedIds([randomWord.id]);
    
    const newInputs = { verb: '', nounPerson: '', nounConcept: '', adjective: '', adverb: '' };
    newInputs[randomType] = randomWord[randomType];
    setInputs(newInputs);
    setChecked(false);
    setResults({ verb: false, nounPerson: false, nounConcept: false, adjective: false, adverb: false });
  };

  const handleInputChange = (type: WordFormType, value: string) => {
    if (checked) {
        // If they try to edit after checking, reset checked state
        setChecked(false);
    }
    setInputs(prev => ({ ...prev, [type]: value }));
  };

  const handleCheck = () => {
    if (!currentWord) return;

    let correctCount = 0;
    const newResults: Record<WordFormType, boolean> = { ...results };

    FORMS.forEach(type => {
      // Don't score the given type
      if (type === givenType) {
        newResults[type] = true;
        return;
      }

      const userVal = normalize(inputs[type]);
      const correctValRaw = currentWord[type];
      
      // Handle multiple correct answers separated by "/"
      // Example: "Child / Children" -> accepts "child", "children"
      const correctOptions = correctValRaw.split('/').map(s => normalize(s));
      
      // Also allow exact full match if user types "Child / Children"
      if (userVal !== '') {
          correctOptions.push(normalize(correctValRaw));
      }

      const isCorrect = correctOptions.includes(userVal);
      newResults[type] = isCorrect;

      if (isCorrect) {
        correctCount++;
      }
    });

    setResults(newResults);
    setChecked(true);

    // Update global score
    setTotalQuestions(prev => prev + 4);
    setTotalCorrect(prev => prev + correctCount);
  };

  const score = totalQuestions > 0 ? (10 * (totalCorrect / totalQuestions)).toFixed(2) : '10.00';

  if (isFinished) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.finishScreen}>
            <h1 style={{color: 'var(--primary)', marginBottom: '16px'}}>Congratulations!</h1>
            <p style={{fontSize: '1.2rem', marginBottom: '24px'}}>You have practiced all {wordData.length} word families.</p>
            
            <div style={styles.finalScore}>
              <div>Final Score</div>
              <div style={styles.finalScoreValue}>{score}</div>
              <div style={styles.stats}>{totalCorrect} / {totalQuestions} correct answers</div>
            </div>

            <button style={styles.buttonPrimary} onClick={handleRestart}>
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
            <h1 style={styles.title}>Word Form Practice</h1>
            <span style={styles.progressBadge}>Word {usedIds.length} of {wordData.length}</span>
        </div>
        <div style={styles.scoreBoard}>
          <div style={styles.scoreItem}>
            <span style={styles.scoreLabel}>Score</span>
            <span style={styles.scoreValue}>{score}</span>
          </div>
          <div style={styles.stats}>
            {totalCorrect} / {totalQuestions} correct
          </div>
        </div>
      </header>

      <main style={styles.card}>
        {currentWord ? (
          <>
            <div style={styles.grid}>
              {FORMS.map((type) => {
                const isGiven = type === givenType;
                const isCorrect = results[type];
                const value = inputs[type];
                const isEmptyField = currentWord[type] === '';
                
                // Determine styling based on state
                let inputStyle = styles.input;
                if (isGiven) inputStyle = { ...inputStyle, ...styles.inputGiven };
                else if (checked) {
                  inputStyle = { 
                    ...inputStyle, 
                    ...(isCorrect ? styles.inputCorrect : styles.inputError) 
                  };
                }

                return (
                  <div key={type} style={styles.fieldContainer}>
                    <label style={styles.label}>{LABELS[type]}</label>
                    <div style={styles.inputWrapper}>
                        <input
                        style={inputStyle}
                        value={value}
                        onChange={(e) => handleInputChange(type, e.target.value)}
                        disabled={isGiven}
                        placeholder={isGiven ? '' : '?'}
                        autoComplete="off"
                        />
                        {checked && !isGiven && (
                            <span style={styles.feedbackIcon}>
                                {isCorrect ? '✅' : '❌'}
                            </span>
                        )}
                         {checked && !isCorrect && isEmptyField && (
                             <div style={styles.helperText}>(Leave blank)</div>
                         )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={styles.actions}>
              <button 
                style={styles.buttonSecondary} 
                onClick={pickNewWord}
              >
                Skip / Next Word
              </button>
              <button 
                style={styles.buttonPrimary} 
                onClick={handleCheck}
              >
                Check Answers
              </button>
            </div>
            
            {checked && (
               <div style={styles.message}>
                 {Object.values(results).filter((r, i) => FORMS[i] !== givenType && !r).length === 0 
                   ? <span style={{color: 'var(--success)'}}>Excellent! All correct.</span>
                   : <span style={{color: 'var(--error)'}}>Some answers are incorrect. Try again!</span>
                 }
               </div>
            )}
          </>
        ) : (
          <div>Loading...</div>
        )}
      </main>
      
      <footer style={styles.footer}>
        <p>Database loaded with {wordData.length} word families.</p>
      </footer>
    </div>
  );
};

// --- Styles ---

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid var(--border)',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: 'var(--primary)',
  },
  progressBadge: {
      fontSize: '0.85rem',
      backgroundColor: '#e0e7ff',
      color: '#4338ca',
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 600,
      width: 'fit-content',
  },
  scoreBoard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scoreItem: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  scoreLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600,
  },
  scoreValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text)',
  },
  stats: {
    fontSize: '0.875rem',
    color: '#9ca3af',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    height: '32px', // fixed height for alignment
    display: 'flex',
    alignItems: 'end',
  },
  inputWrapper: {
      position: 'relative',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '2px solid var(--border)',
    outline: 'none',
    transition: 'all 0.2s',
    backgroundColor: '#fff',
    color: 'var(--text)',
  },
  inputGiven: {
    backgroundColor: 'var(--disabled)',
    color: '#4b5563',
    fontWeight: 600,
    borderColor: 'transparent',
  },
  inputCorrect: {
    borderColor: 'var(--success)',
    backgroundColor: '#ecfdf5',
    color: 'var(--success)',
  },
  inputError: {
    borderColor: 'var(--error)',
    backgroundColor: '#fef2f2',
    color: 'var(--error)',
  },
  feedbackIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '12px',
  },
  helperText: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      marginTop: '4px',
      textAlign: 'right',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    borderTop: '1px solid var(--border)',
    paddingTop: '24px',
  },
  buttonPrimary: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
  },
  buttonSecondary: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
  },
  message: {
      marginTop: '16px',
      textAlign: 'right',
      fontWeight: 500,
  },
  footer: {
      marginTop: '32px',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#9ca3af',
  },
  finishScreen: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
      textAlign: 'center',
  },
  finalScore: {
      backgroundColor: '#f3f4f6',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '32px',
      width: '100%',
      maxWidth: '300px',
  },
  finalScoreValue: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'var(--primary)',
      margin: '8px 0',
  }
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);