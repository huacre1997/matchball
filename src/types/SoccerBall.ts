export const SoccerBallStates = {
  BALL_ENTER: "ballEnter",
  RESIZE_BALL: "resizeBall",
  INITIAL: "initial",
  STOP: "stop",
} as const;

export type SoccerBallState =
  (typeof SoccerBallStates)[keyof typeof SoccerBallStates];
