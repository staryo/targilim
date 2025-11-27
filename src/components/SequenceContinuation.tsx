import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography } from '@mui/material';

interface SequenceExercise {
  numbers: number[];
  step: number;
  hideCount: number; // How many numbers to hide at the end
}

const ExerciseBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  border: '1px solid black',
  margin: theme.spacing(0.2),
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    height: '40px',
    padding: theme.spacing(0.8),
    margin: theme.spacing(0.2)
  }
}));

const SequenceText = styled(Typography)({
  fontFamily: 'Rubik',
  fontSize: '20px',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '18px'
  }
});

const SequenceGrid = styled(Grid)({
  '@media (max-width: 600px)': {
    '& .MuiGrid-item': {
      width: '50%',
      flexBasis: '50%',
      maxWidth: '50%'
    }
  }
});

const generateSequence = (): SequenceExercise => {
  // Randomly choose step size (can be positive or negative)
  const stepSizes = [1, 2, 3, 4, 5, 10];
  const step = stepSizes[Math.floor(Math.random() * stepSizes.length)];
  
  // Randomly choose if increasing or decreasing
  const isIncreasing = Math.random() < 0.7; // 70% increasing, 30% decreasing
  const actualStep = isIncreasing ? step : -step;
  
  // Generate starting number (1-50 for increasing, 50-99 for decreasing)
  const startNumber = isIncreasing 
    ? Math.floor(Math.random() * 50) + 1
    : Math.floor(Math.random() * 50) + 50;
  
  // Generate sequence with at least 4 numbers (show 3, hide 1+)
  const numbers: number[] = [];
  
  for (let i = 0; i < 6; i++) {
    const num = startNumber + (actualStep * i);
    // Make sure numbers are within 1-99 range
    if (num >= 1 && num <= 99) {
      numbers.push(num);
    } else {
      break;
    }
  }
  
  // Always show first 3 numbers, hide the rest
  const hideCount = Math.max(1, numbers.length - 3);
  
  return { numbers, step: actualStep, hideCount };
};

const generateExercises = (count: number): SequenceExercise[] => {
  return Array.from({ length: count }, () => generateSequence());
};

interface SequenceContinuationProps {
  exerciseCount?: number;
}

export const SequenceContinuation = ({ exerciseCount = 6 }: SequenceContinuationProps) => {
  const exercises = generateExercises(exerciseCount);

  return (
    <div>
      <SequenceGrid container spacing={0.5}>
        {exercises.map((exercise, index) => {
          // Always show first 3 numbers
          const visibleNumbers = exercise.numbers.slice(0, 3);
          // Add 2-3 blank spaces for child to fill in
          const blankCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 blanks
          
          return (
            <Grid item xs={4} key={index}>
              <ExerciseBox elevation={0}>
                <SequenceText>
                  {visibleNumbers.join(', ')}
                  {', '}
                  {Array(blankCount).fill('__').join(', ')}
                </SequenceText>
              </ExerciseBox>
            </Grid>
          );
        })}
      </SequenceGrid>
    </div>
  );
};

