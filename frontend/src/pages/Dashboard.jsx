import React, { useState } from 'react';
import { 
  BookOpen, 
  Hand, 
  Headphones, 
  Captions, 
  Users, 
  Eye, 
  Calculator, 
  Heart, 
  MessageSquare,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';
import Layout from '../components/Layout';
import SkillCard from '../components/SkillCard';
import StorybookCreator from '../components/skills/StorybookCreator';
import SignLanguageCreator from '../components/skills/SignLanguageCreator';
import AudiobookCreator from '../components/skills/AudiobookCreator';
import LiveCaptioning from '../components/skills/LiveCaptioning';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Dashboard = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    {
      id: 'storybook',
      title: 'Dyslexic Support',
      description: 'Transform complex text into engaging, easy-to-read storybooks with simple sentences and clear structure.',
      icon: BookOpen,
      category: 'Learning',
      component: StorybookCreator,
    },
    {
      id: 'sign',
      title: 'Deaf Support',
      description: 'Convert text content into comprehensive sign language video scripts with timing and gesture notes.',
      icon: Hand,
      category: 'Communication',
      component: SignLanguageCreator,
    },
    {
      id: 'audiobook',
      title: 'Blind Support',
      description: 'Create high-quality audiobooks with professional narration and clear audio navigation cues.',
      icon: Headphones,
      category: 'Audio',
      component: AudiobookCreator,
    },
    {
      id: 'live_caption',
      title: 'Live Captioning',
      description: 'Real-time speech-to-text transcription for lectures, meetings, and conversations.',
      icon: Captions,
      category: 'Real-time',
      component: LiveCaptioning,
    },
    {
      id: 'social_story',
      title: 'Social Stories',
      description: 'Create personalized social stories to help students with autism navigate social situations.',
      icon: Users,
      category: 'Social',
      component: null,
    },
    {
      id: 'describe_image',
      title: 'Image Description',
      description: 'Generate detailed descriptions of images, diagrams, and visual content for blind students.',
      icon: Eye,
      category: 'Visual',
      component: null,
    },
    {
      id: 'math',
      title: 'Math Support',
      description: 'Step-by-step math problem solving with visual explanations for students with dyscalculia.',
      icon: Calculator,
      category: 'Academic',
      component: null,
    },
    {
      id: 'emotion',
      title: 'Emotion Coaching',
      description: 'Provide emotional support, coping strategies, and mental health guidance for students.',
      icon: Heart,
      category: 'Wellness',
      component: null,
    },
    {
      id: 'comm_board',
      title: 'Communication Board',
      description: 'Generate personalized AAC communication boards for students with speech disorders.',
      icon: MessageSquare,
      category: 'Communication',
      component: null,
    },
  ];

  const stats = [
    { label: 'Students Helped', value: '2,847', icon: Users, color: 'text-blue-600' },
    { label: 'Content Created', value: '1,293', icon: Sparkles, color: 'text-purple-600' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Avg. Response', value: '2.3s', icon: Clock, color: 'text-orange-600' },
  ];

  const ActiveComponent = activeSkill ? skills.find(s => s.id === activeSkill)?.component : null;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full">
            <Sparkles className="h-5 w-5 text-primary-600" />
            <span className="text-primary-700 font-medium">AI-Powered Accessibility Assistant</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to <span className="gradient-text">Sohopathi</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform learning content into accessible formats for students with disabilities. 
            Choose a skill below to get started with personalized educational support.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className={`inline-flex p-2 rounded-lg bg-gray-50 mb-2`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Accessibility Skills</h2>
                <p className="text-gray-600">Select a skill to create accessible content</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      title={skill.title}
                      description={skill.description}
                      icon={skill.icon}
                      category={skill.category}
                      isActive={activeSkill === skill.id}
                      onClick={() => setActiveSkill(skill.id)}
                      className="w-full"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Skill Component */}
          <div className="lg:col-span-2">
            {ActiveComponent ? (
              <ActiveComponent />
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
                    <Sparkles className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a Skill to Get Started
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Choose an accessibility skill from the left panel to begin creating 
                    personalized educational content for students with disabilities.
                  </p>
                  {activeSkill && !ActiveComponent && (
                    <div className="mt-6">
                      <Badge variant="warning">Coming Soon</Badge>
                      <p className="text-sm text-gray-500 mt-2">
                        This skill is currently under development
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;