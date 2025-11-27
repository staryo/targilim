import { Button, Typography, styled, ToggleButtonGroup, ToggleButton } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MathWorksheet } from './MathWorksheet';
import { NumberDecomposition } from './NumberDecomposition';
import { AdvancedMathWorksheet } from './AdvancedMathWorksheet';
import { AdvancedNumberDecomposition } from './AdvancedNumberDecomposition';
import { EqualityComparison } from './EqualityComparison';
import { SequenceContinuation } from './SequenceContinuation';
import { useRef, useState, useEffect } from 'react';

const PageTitle = styled(Typography)({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
  direction: 'rtl',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    fontSize: '22px',
    marginBottom: '10px'
  }
});

const Section = styled('div')({
  marginBottom: '8px',
  width: '100%'
});

const WorksheetContainer = styled('div')({
  width: '210mm',
  minHeight: '297mm',
  padding: '6mm',
  margin: '0 auto',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Rubik',
  '@media screen': {
    border: '1px solid #ccc',
    margin: '20px auto'
  },
  '@media (max-width: 600px)': {
    width: '100%',
    minHeight: 'auto',
    padding: '10px',
    margin: 0,
    '&.pdf-mode': {
      width: '210mm',
      minHeight: '297mm',
      padding: '6mm'
    }
  }
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  '@media (max-width: 600px)': {
    padding: '10px'
  }
});

const PrintButton = styled(Button)({
  marginBottom: '15px',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    width: '100%',
    marginBottom: '15px'
  }
});

const LevelSelector = styled(ToggleButtonGroup)({
  marginBottom: '15px',
  fontFamily: 'Rubik',
  direction: 'rtl',
  '& .MuiToggleButton-root': {
    fontFamily: 'Rubik',
    fontSize: '16px',
    padding: '8px 16px',
    '@media (max-width: 600px)': {
      fontSize: '14px',
      padding: '6px 12px'
    }
  }
});

const SectionTitle = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '6px',
  direction: 'rtl',
  fontFamily: 'Rubik',
  '@media (max-width: 600px)': {
    fontSize: '16px',
    marginBottom: '4px'
  }
});

type Level = 'basic' | 'advanced';

const STORAGE_KEY = 'targilim-level';

export const PDFGenerator = () => {
  const worksheetRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<Level>(() => {
    // Initialize from localStorage or default to 'basic'
    const savedLevel = localStorage.getItem(STORAGE_KEY);
    return (savedLevel === 'basic' || savedLevel === 'advanced') ? savedLevel : 'basic';
  });

  useEffect(() => {
    // Save to localStorage whenever level changes
    localStorage.setItem(STORAGE_KEY, level);
  }, [level]);

  const handleLevelChange = (_event: React.MouseEvent<HTMLElement>, newLevel: Level | null) => {
    if (newLevel !== null) {
      setLevel(newLevel);
    }
  };

  const generatePDF = async () => {
    if (!worksheetRef.current) return;

    try {
      // Temporarily add PDF mode class for correct layout
      worksheetRef.current.classList.add('pdf-mode');

      // Force mobile layout to desktop mode for PDF generation
      const exerciseGrids = worksheetRef.current.querySelectorAll('.MuiGrid-item');
      exerciseGrids.forEach(grid => {
        if (window.innerWidth <= 600) {
          (grid as HTMLElement).style.width = '';
          (grid as HTMLElement).style.maxWidth = '';
          (grid as HTMLElement).style.flexBasis = '';
        }
      });

      // Create canvas from the worksheet
      const canvas = await html2canvas(worksheetRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: 'white',
        width: 793, // A4 width in pixels at 96 DPI
        height: 1122, // A4 height in pixels at 96 DPI
        windowWidth: 793,
        windowHeight: 1150 // Slightly increased height to ensure bottom content is captured
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Add image to PDF with minimal margins
      const margin = 2; // Reduced from 3mm to 2mm
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', margin, margin, 210 - 2 * margin, 297 - 2 * margin);

      // Save PDF
      pdf.save('math-exercises.pdf');

      // Remove temporary PDF mode class
      worksheetRef.current.classList.remove('pdf-mode');

      // Restore mobile layout
      if (window.innerWidth <= 600) {
        exerciseGrids.forEach(grid => {
          (grid as HTMLElement).style.width = '';
          (grid as HTMLElement).style.maxWidth = '';
          (grid as HTMLElement).style.flexBasis = '';
        });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Container>
      <LevelSelector
        value={level}
        exclusive
        onChange={handleLevelChange}
        aria-label="level selection"
      >
        <ToggleButton value="basic" aria-label="basic level">
          רמה בסיסית
        </ToggleButton>
        <ToggleButton value="advanced" aria-label="advanced level">
          רמה מתקדמת
        </ToggleButton>
      </LevelSelector>
      <PrintButton 
        variant="contained" 
        color="primary" 
        onClick={generatePDF}
      >
        הדפס תרגילים
      </PrintButton>
      <WorksheetContainer ref={worksheetRef}>
        <PageTitle>דף עבודה בחשבון</PageTitle>
        {level === 'basic' ? (
          <>
            <Section>
              <MathWorksheet exerciseCount={21} maxResult={20} />
            </Section>
            <Section>
              <NumberDecomposition exerciseCount={6} maxSum={20} />
            </Section>
          </>
        ) : (
          <>
            <Section>
              <SectionTitle>תרגילי חשבון</SectionTitle>
              <AdvancedMathWorksheet exerciseCount={18} />
            </Section>
            <Section>
              <SectionTitle>פירוק מספרים</SectionTitle>
              <AdvancedNumberDecomposition exerciseCount={4} />
            </Section>
            <Section>
              <SectionTitle>השוואת מספרים</SectionTitle>
              <EqualityComparison exerciseCount={6} />
            </Section>
            <Section>
              <SectionTitle>המשך סדרה</SectionTitle>
              <SequenceContinuation exerciseCount={6} />
            </Section>
          </>
        )}
      </WorksheetContainer>
    </Container>
  );
}; 