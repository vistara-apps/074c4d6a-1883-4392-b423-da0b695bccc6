import OpenAI from 'openai';
import { AIRecommendation, Charity } from './types';
import { SAMPLE_CHARITIES } from './constants';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function getAIRecommendations(
  userValues: string[],
  charities: Charity[] = SAMPLE_CHARITIES
): Promise<AIRecommendation[]> {
  try {
    const prompt = `
      You are an AI assistant helping users find charities that align with their values.
      
      User's preferred values: ${userValues.join(', ')}
      
      Available charities:
      ${charities.map(charity => `
        - ${charity.name}: ${charity.description}
        - Impact areas: ${charity.impactAreas.join(', ')}
        - Rating: ${charity.rating}/5
      `).join('\n')}
      
      Please analyze each charity and provide:
      1. A match score (0-100) based on how well it aligns with the user's values
      2. A brief reasoning (1-2 sentences) explaining why it's a good match
      
      Return your response as a JSON array with this structure:
      [
        {
          "charityId": "1",
          "matchScore": 85,
          "reasoning": "This charity directly addresses your environmental values through forest conservation and climate action."
        }
      ]
      
      Only include charities with a match score of 60 or higher.
    `;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI service');
    }

    const aiResults = JSON.parse(content);
    
    // Map AI results to full charity objects
    const recommendations: AIRecommendation[] = aiResults
      .map((result: any) => {
        const charity = charities.find(c => c.charityId === result.charityId);
        if (!charity) return null;
        
        return {
          charity,
          matchScore: result.matchScore,
          reasoning: result.reasoning
        };
      })
      .filter(Boolean)
      .sort((a: AIRecommendation, b: AIRecommendation) => b.matchScore - a.matchScore);

    return recommendations;
  } catch (error) {
    console.error('AI recommendation error:', error);
    
    // Fallback: return sample recommendations based on simple matching
    const fallbackRecommendations = charities
      .map(charity => {
        const matchingAreas = charity.impactAreas.filter(area => 
          userValues.some(value => area.toLowerCase().includes(value.toLowerCase()))
        );
        
        const matchScore = Math.min(90, (matchingAreas.length / charity.impactAreas.length) * 100);
        
        return {
          charity,
          matchScore,
          reasoning: `This charity aligns with your ${userValues.join(' and ')} values through their work in ${charity.impactAreas.join(', ')}.`
        };
      })
      .filter(rec => rec.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    return fallbackRecommendations;
  }
}
