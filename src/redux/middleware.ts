import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

export const rtkQueryLogger: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    console.warn(
      `We got a rejected action! Error: ${JSON.stringify(action.error)}`
    );
  }
  next(action);
};
