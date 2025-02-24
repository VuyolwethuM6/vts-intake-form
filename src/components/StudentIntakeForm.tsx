import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ProgressSteps from './ProgressSteps';
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';

const FORM_STEPS = [
  'Person Info',
  'Sub Selection',
  'Marks',
  'Review'
];

const SUBJECTS = [
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'english', name: 'English' },
  { id: 'history', name: 'History' }
];

interface SubjectMarks {
  currentMarks: string;
  targetMarks: string;
}

type MarksData = {
  [key: string]: SubjectMarks;
};

const StudentIntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    guardianContact: '',
    selectedSubjects: [] as string[],
    marks: {} as MarksData,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subjectId: string) => {
    setFormData(prev => {
      const currentSubjects = prev.selectedSubjects;
      const isSelected = currentSubjects.includes(subjectId);
      
      const updatedSubjects = isSelected
        ? currentSubjects.filter(id => id !== subjectId)
        : [...currentSubjects, subjectId];
      
      return { ...prev, selectedSubjects: updatedSubjects };
    });
  };

  const handleMarksChange = (subjectId: string, field: 'currentMarks' | 'targetMarks', value: string) => {
    setFormData(prev => ({
      ...prev,
      marks: {
        ...prev.marks,
        [subjectId]: {
          ...prev.marks[subjectId],
          [field]: value
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.school;
      case 2:
        return formData.selectedSubjects.length > 0;
      case 3:
        return formData.selectedSubjects.every(subject => 
          formData.marks[subject]?.currentMarks && 
          formData.marks[subject]?.targetMarks
        );
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 bg-background text-foreground">
      {/* Branding */}
      {/* <div className="w-full max-w-3xl mb-16 flex flex-col items-center justify-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-semibold text-gold">Student Connect</h2>
      </div> */}
          <div className="flex justify-center">
      <img 
        src="/vts-logo.jpg" 
        alt="Logo" 
        className="w-25 h-25"
      />
    </div>

      <div className="w-full max-w-3xl space-y-10 px-4">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-foreground">
            Student Upgrade Form
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please fill in your details, select the subjects you wish to upgrade, and provide your current and desired marks.
          </p>
        </div>

        {/* Progress Steps */}
        <ProgressSteps steps={FORM_STEPS} currentStep={currentStep} />

        {/* Form Card */}
        <Card className="p-8 glass">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your contact number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School Name</Label>
                  <Input
                    id="school"
                    name="school"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guardianContact">Parent/Guardian Contact</Label>
                  <Input
                    id="guardianContact"
                    name="guardianContact"
                    type="tel"
                    placeholder="Enter parent/guardian contact number"
                    value={formData.guardianContact}
                    onChange={handleInputChange}
                    className="bg-secondary/50"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Select Subjects for Upgrade</Label>
                  <p className="text-muted-foreground">Choose the subjects you want to improve</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SUBJECTS.map((subject) => (
                      <div
                        key={subject.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          formData.selectedSubjects.includes(subject.id)
                            ? 'border-gold bg-gold/10'
                            : 'border-border hover:border-gold/50'
                        }`}
                      >
                        <RadioGroup
                          value={formData.selectedSubjects.includes(subject.id) ? subject.id : ""}
                          onValueChange={() => handleSubjectChange(subject.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={subject.id} id={subject.id} />
                            <Label htmlFor={subject.id} className="cursor-pointer">
                              {subject.name}
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Enter Your Marks</Label>
                  <p className="text-muted-foreground">For each selected subject, enter your current marks and target marks</p>
                  <div className="grid gap-6">
                    {formData.selectedSubjects.map((subjectId) => {
                      const subject = SUBJECTS.find(s => s.id === subjectId);
                      return (
                        <div key={subjectId} className="p-4 rounded-lg border border-border">
                          <Label className="text-base mb-4 block">{subject?.name}</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`current-${subjectId}`}>Current Marks (%)</Label>
                              <Input
                                id={`current-${subjectId}`}
                                type="number"
                                min="0"
                                max="100"
                                value={formData.marks[subjectId]?.currentMarks || ''}
                                onChange={(e) => handleMarksChange(subjectId, 'currentMarks', e.target.value)}
                                className="bg-secondary/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`target-${subjectId}`}>Target Marks (%)</Label>
                              <Input
                                id={`target-${subjectId}`}
                                type="number"
                                min="0"
                                max="100"
                                value={formData.marks[subjectId]?.targetMarks || ''}
                                onChange={(e) => handleMarksChange(subjectId, 'targetMarks', e.target.value)}
                                className="bg-secondary/50"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-in slide-in fade-in">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Review Your Information</h3>
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gold">Personal Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <p><span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}</p>
                          <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                          <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                          <p><span className="text-muted-foreground">School:</span> {formData.school}</p>
                          <p><span className="text-muted-foreground">Guardian Contact:</span> {formData.guardianContact}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gold">Selected Subjects and Marks</h4>
                        <div className="grid gap-4">
                          {formData.selectedSubjects.map((subjectId) => {
                            const subject = SUBJECTS.find(s => s.id === subjectId);
                            const marks = formData.marks[subjectId];
                            return (
                              <div key={subjectId} className="p-4 rounded-lg border border-border">
                                <p className="font-medium mb-2">{subject?.name}</p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <p><span className="text-muted-foreground">Current Marks:</span> {marks?.currentMarks}%</p>
                                  <p><span className="text-muted-foreground">Target Marks:</span> {marks?.targetMarks}%</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="w-[120px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {currentStep === FORM_STEPS.length ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-[120px] bg-gold hover:bg-gold-dark text-white"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="w-[120px] bg-gold hover:bg-gold-dark text-white"
                >
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default StudentIntakeForm;
