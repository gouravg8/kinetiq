import { z } from "zod";

const workoutModal = z.object({
	bodyPart: z.array(z.string()).min(1),
	isCompleted: z.boolean(),
});

export type WorkoutModalType = z.infer<typeof workoutModal>;

export default workoutModal;
