import { styled } from '@mui/material/styles';
import { Paper, Grid, Typography } from '@mui/material';

interface DecompositionExercise {
  sum: number;
  part1: number;
  part2: number;
  hidePosition: 'sum' | 'part1' | 'part2';
}

const ExerciseBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.8),
  textAlign: 'center',
  border: '1px solid black',
  margin: theme.spacing(0.2),
  minHeight: '85px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    minHeight: '80px',
    padding: theme.spacing(0.8),
    margin: theme.spacing(0.2)
  }
}));

const NumberBox = styled('div')({
  border: '1px solid black',
  width: '45px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '22px',
  fontWeight: 'bold',
  backgroundColor: 'white',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    width: '35px',
    height: '35px',
    fontSize: '18px'
  }
});

const HebrewLabel = styled(Typography)({
  fontSize: '16px',
  direction: 'rtl',
  marginBottom: '2px',
  fontFamily: 'Rubik',
  fontWeight: 'bold',
  '@media (max-width: 600px)': {
    fontSize: '14px'
  }
});

const PartsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '25px',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: '8px',
  '@media (max-width: 600px)': {
    gap: '18px',
    marginTop: '6px'
  }
});

const PartWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const DecompositionGrid = styled(Grid)({
  '@media (max-width: 600px)': {
    '& .MuiGrid-item': {
      width: '100%',
      flexBasis: '100%',
      maxWidth: '100%'
    }
  }
});

const generateDecomposition = (): DecompositionExercise => {
  let sum: number;
  let part1: number;
  let part2: number;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    // Generate sum up to 99
    sum = Math.floor(Math.random() * 98) + 2;
    part1 = Math.floor(Math.random() * (sum - 1)) + 1;
    part2 = sum - part1;
    
    // Check if any number is >= 20
    const hasNumberAbove20 = sum >= 20 || part1 >= 20 || part2 >= 20;
    
    if (hasNumberAbove20) {
      // Constraint: sum of ones digits (first digit) shouldn't be more than 10
      // Only applies when any number >= 20
      const part1Ones = part1 % 10;
      const part2Ones = part2 % 10;
      const sumOfOnes = part1Ones + part2Ones;
      
      if (sumOfOnes <= 10) {
        break;
      }
    } else {
      // When all numbers < 20, no constraint on ones digits
      break;
    }
    
    attempts++;
  } while (attempts < maxAttempts);
  
  // Fallback: return a safe exercise
  if (attempts >= maxAttempts) {
    sum = 25;
    part1 = 10;
    part2 = 15;
  }
  
  const hidePosition = ['sum', 'part1', 'part2'][Math.floor(Math.random() * 3)] as 'sum' | 'part1' | 'part2';
  
  return { sum, part1, part2, hidePosition };
};

const generateExercises = (count: number): DecompositionExercise[] => {
  return Array.from({ length: count }, () => generateDecomposition());
};

interface AdvancedNumberDecompositionProps {
  exerciseCount?: number;
}

export const AdvancedNumberDecomposition = ({ exerciseCount = 4 }: AdvancedNumberDecompositionProps) => {
  const exercises = generateExercises(exerciseCount);

  return (
    <DecompositionGrid container spacing={0.5}>
      {exercises.map((exercise, index) => (
        <Grid item xs={6} key={index}>
          <ExerciseBox elevation={0}>
            <div>
              <HebrewLabel>שלם</HebrewLabel>
              <NumberBox>
                {exercise.hidePosition === 'sum' ? '' : exercise.sum}
              </NumberBox>
            </div>
            <PartsContainer>
              <PartWrapper>
                <HebrewLabel>חלק 1</HebrewLabel>
                <NumberBox>
                  {exercise.hidePosition === 'part1' ? '' : exercise.part1}
                </NumberBox>
              </PartWrapper>
              <PartWrapper>
                <HebrewLabel>חלק 2</HebrewLabel>
                <NumberBox>
                  {exercise.hidePosition === 'part2' ? '' : exercise.part2}
                </NumberBox>
              </PartWrapper>
            </PartsContainer>
          </ExerciseBox>
        </Grid>
      ))}
    </DecompositionGrid>
  );
};

