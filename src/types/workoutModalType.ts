import { z } from "zod";

const workoutModal = z.object({
    bodyPart: z.string(),
    isCompleted: z.boolean(),
});

export type WorkoutModalType = z.infer<typeof workoutModal>;

export default workoutModal;