import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

//Implementation Details
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'prompt is required')
      .max(1000, 'Prompt is too long(max 1000 characters)'),
   conversationId: z.string().uuid(),
});

//Public iterface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format());
         return;
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);
         // conversations.set(conversationId, response.id);
         res.json({ message: response.message });
      } catch (error) {
         if (error instanceof Error) {
            res.status(500).json({ error: { message: error.message } });
         }
         console.log(error);
         res.status(500).json({ error: 'Failed to generate a response' });
      }
   },
};
