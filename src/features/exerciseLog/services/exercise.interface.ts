export abstract class IExerciseLogger {
  abstract getDefaultExercises(): IExercise[];
  abstract getRecentExercises(): IExercise[];
  abstract searchExercises(query: string): IExercise[];
  abstract addExercise(exercise: IExercise): IExercise;
  abstract createWorkout(date?: Date): IWorkout;
  abstract updateWorkout(id: string, updatedWorkout: IWorkout): IWorkout;
}

export interface MuscleGroup {
  id: string;
  muscle: string;
}
export interface IExercise {
  id: string;
  name: string;
  muscleGroups: MuscleGroup[];
  type: string;
  sets: number;
  reps: number;
}
export interface IWorkout {
  id: string;
  date: Date;
  exercises: IExercise[];
}