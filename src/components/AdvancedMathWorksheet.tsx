import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography } from '@mui/material';

interface Exercise {
  firstNumber: number;
  secondNumber: number;
  operation: '+' | '-';
}

const ExerciseBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  textAlign: 'center',
  border: '1px solid black',
  margin: theme.spacing(0.2),
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    height: '35px',
    fontSize: '16px',
    padding: theme.spacing(0.8),
    margin: theme.spacing(0.2)
  }
}));

const ExerciseText = styled(Typography)({
  fontFamily: 'Rubik',
  fontSize: '20px',
  '@media (max-width: 600px)': {
    fontSize: '18px'
  }
});

const ExerciseGrid = styled(Grid)({
  '@media (max-width: 600px)': {
    '& .MuiGrid-item': {
      width: '50%',
      flexBasis: '50%',
      maxWidth: '50%'
    }
  }
});

// Generate addition exercise with constraints:
// - Sum of tens ≤ 10
// - Sum of ones ≤ 10 (only when any number >= 20)
const generateAdditionExercise = (): Exercise => {
  let firstNumber: number;
  let secondNumber: number;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    // Generate numbers up to 99
    firstNumber = Math.floor(Math.random() * 99) + 1;
    secondNumber = Math.floor(Math.random() * 99) + 1;
    
    const sum = firstNumber + secondNumber;
    
    // Check constraints
    const firstTens = Math.floor(firstNumber / 10);
    const firstOnes = firstNumber % 10;
    const secondTens = Math.floor(secondNumber / 10);
    const secondOnes = secondNumber % 10;
    
    const sumOfTens = firstTens + secondTens;
    const sumOfOnes = firstOnes + secondOnes;
    
    // Check if sum ≤ 99, sum of tens ≤ 10
    if (sum <= 99 && sumOfTens <= 10) {
      // Check if any number is >= 20
      const hasNumberAbove20 = firstNumber >= 20 || secondNumber >= 20;
      
      if (!hasNumberAbove20) {
        // For tasks under 20, no constraint on sum of ones digits
        return { firstNumber, secondNumber, operation: '+' };
      } else {
        // For tasks with any number >= 20, sum of ones must be <= 10
        if (sumOfOnes <= 10) {
          return { firstNumber, secondNumber, operation: '+' };
        }
      }
    }
    
    attempts++;
  } while (attempts < maxAttempts);
  
  // Fallback: return a safe exercise
  return { firstNumber: 23, secondNumber: 34, operation: '+' };
};

// Generate subtraction exercise where result ≥ 0 and both numbers ≤ 99
// When any number >= 20: difference between ones digits must be >= 0
const generateSubtractionExercise = (): Exercise => {
  let firstNumber: number;
  let secondNumber: number;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    firstNumber = Math.floor(Math.random() * 99) + 1;
    secondNumber = Math.floor(Math.random() * firstNumber) + 1;
    
    // Check if any number is >= 20
    const hasNumberAbove20 = firstNumber >= 20 || secondNumber >= 20;
    
    if (hasNumberAbove20) {
      // When any number >= 20, ones digit difference must be >= 0
      const firstOnes = firstNumber % 10;
      const secondOnes = secondNumber % 10;
      const onesDifference = firstOnes - secondOnes;
      
      if (onesDifference >= 0) {
        return { firstNumber, secondNumber, operation: '-' };
      }
    } else {
      // When both numbers < 20, no constraint on ones digits
      return { firstNumber, secondNumber, operation: '-' };
    }
    
    attempts++;
  } while (attempts < maxAttempts);
  
  // Fallback: return a safe exercise
  return { firstNumber: 45, secondNumber: 23, operation: '-' };
};

const generateExercise = (): Exercise => {
  return Math.random() < 0.5 ? generateAdditionExercise() : generateSubtractionExercise();
};

const generateExercises = (count: number): Exercise[] => {
  return Array.from({ length: count }, () => generateExercise());
};

interface AdvancedMathWorksheetProps {
  exerciseCount?: number;
}

export const AdvancedMathWorksheet = ({ exerciseCount = 18 }: AdvancedMathWorksheetProps) => {
  const exercises = generateExercises(exerciseCount);

  return (
    <div>
      <ExerciseGrid container spacing={0.5}>
        {exercises.map((exercise, index) => (
          <Grid item xs={4} key={index}>
            <ExerciseBox elevation={0}>
              <ExerciseText>
                {exercise.firstNumber} {exercise.operation} {exercise.secondNumber} =
              </ExerciseText>
            </ExerciseBox>
          </Grid>
        ))}
      </ExerciseGrid>
    </div>
  );
};

