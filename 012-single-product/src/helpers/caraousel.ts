import { useEffect, useReducer, useState } from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';

interface ICarouselState {
  offset: number, // use to capture users drag gesture
  desired: number, // used to capture where you want to go
  active: number, // used to capture active slide
}

interface ICaraouselAction {
  type: string,
  payload?: any
}

export interface ICarouselOptions {
  slidesPresented?: number;
}

const initialCarouselState: ICarouselState = {
  offset: 0,
  desired: 0,
  active: 0
};

// defines the time for the animation between slides in milliseconds
const transitionTime = 500;
// defines the threshold when to accept a swipe
const threshold = 0.3;
// defines the limit for swiping (max. the next full and a bit)
const limit = 1;
// animation to be used when bouncing back
const elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
// animation to be used when automatically sliding
const smooth = `transform ${transitionTime}ms ease`;

const next = (numberOfSlides: number, activeSlide: number): number => {
  return (activeSlide + 1) % numberOfSlides
}

const prev = (numberOfSlides: number, activeSlide: number): number => {
  return (activeSlide - 1) % numberOfSlides
}

const caraouselReducer = (state: ICarouselState, action: ICaraouselAction): ICarouselState=> {
  switch(action.type) {
    case "drag": 
      return {
        ...state,
        offset: action.payload.offset
      }
    case "next":
      return {
        ...state,
        desired: next(action.payload.length, state.active)
      }
    case "prev":
      return {
        ...state,
        desired: prev(action.payload.length, state.active)
      }
    case "jump":
      return {
        ...state,
        desired: action.payload.desired
      }
    case "done":
      return {
        ...state,
        offset: NaN,
        active: state.desired
      }
    default:
      return state;
  }
}

const swiped = (
    delta: number,
    dispatch: React.Dispatch<ICaraouselAction>,
    length: number,
    dir: 1 | -1,
    container: Element
  ) => {
    const t = container.clientWidth * threshold;
    const d = dir * delta;

    if (d >= t) {
      const action = dir > 0 ? { type: "next", payload: { length } } : { type: "prev", payload: { length } };
      dispatch(action);
    } else {
      dispatch({
        type: "drag",
        payload: { offset: 0 }
      })
    }
  }

export const useCaraousel = (
  length: number,
  options: ICarouselOptions = { }
  ) => {
  const { slidesPresented = 1 } = options;
  const shadowSlides = 2 * slidesPresented;
  const n = Math.max(1, Math.min(slidesPresented, length));
  const totalWidth = 100 / n;

  const [state, dispatch] = useReducer(caraouselReducer, initialCarouselState);
  const [container, setContainer] = useState<Element | null>(null);

  const { ref, onMouseDown } = useSwipeable({
    onSwiping: (evt) => {
      const sign = Math.sign(evt.deltaX);
      container && dispatch({
        type: "drag",
        payload: { 
          offset: sign * Math.min(Math.abs(evt.deltaX), limit * container?.clientWidth)
        }
      });
    },
    onSwipedLeft: (evt) => {
      container && swiped(evt.deltaX, dispatch, length, 1, container);
    },
    onSwipedRight: (evt) => {
      container && swiped(evt.deltaX, dispatch, length, -1, container);
    },
    trackTouch: true
  });

  const handlers: SwipeableHandlers = {
    onMouseDown,
    ref(container: HTMLElement) {
      setContainer(container?.firstElementChild);
      return ref(container);
    },
  };

  // Uncomment if you want auto-rotation after the interval provided
  // useEffect(() => {
  //   const id = setTimeout(() => dispatch({ type: 'next', length }), interval);
  //   return () => clearTimeout(id);
  // }, [state.offset, state.active]);

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "done" }), transitionTime);
    return () => clearTimeout(id);
  }, [state.desired]);
  
  let style: React.CSSProperties = {
    transform: 'translateX(0)',
    width: `${totalWidth * (length + shadowSlides)}%`,
    left: `-${(state.active + 1) * totalWidth}%`
  };

  if (state.desired !== state.active) {
    const dist = Math.abs(state.active - state.desired);
    const pref = Math.sign(state.offset || 0);
    const dir = (dist > length / 2 ? 1 : -1) * Math.sign(state.desired - state.active);
    const shift = (totalWidth * (pref || dir)) / (length + shadowSlides);

    style = {
      ...style,
      transition: smooth,
      transform: `translateX(${shift}%)`
    }
  } else if (!isNaN(state.offset)) {
    if (state.offset !== 0) {
      style = {
        ...style,
        transform: `translateX(${state.offset}px)`
      }
    } else {
      style = {
        ...style,
        transition: elastic
      }
    }
  }

  return {
    style,
    handlers,
    active: state.active,
    setActive: (n: number) => dispatch({ type: "jump", payload: { desired: n }}),
  }
}
