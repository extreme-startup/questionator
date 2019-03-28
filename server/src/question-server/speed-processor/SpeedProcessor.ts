
const START_SPEED = 5000;
const MAX_SPEED = 20000;
const MIN_SPEED = 1000;
const DELTA_SPEED = 500;

const decreseSpeed = (prevSpeed: number) => 
  (prevSpeed >= MAX_SPEED)
    ? prevSpeed
    : prevSpeed + DELTA_SPEED;

const increaseSpeed = (prevSpeed: number) => 
  (prevSpeed <= MIN_SPEED) 
    ? prevSpeed
    : prevSpeed - DELTA_SPEED;

const updateSpeed = (prevSpeed: number, answerEntry: any) =>
  (answerEntry.isAnswerCorrect) 
    ? increaseSpeed(prevSpeed)
    : decreseSpeed(prevSpeed);


export default function SpeedProcessor(entries) {
  let _currentSpeed;

  function getSpeed() {
    if (!_currentSpeed) {
      _currentSpeed = entries.reduce(updateSpeed, START_SPEED);
    }
    return _currentSpeed;
  }

  function addEntry(entry) {
    _currentSpeed = updateSpeed(_currentSpeed, entry);
  }

  return {
    addEntry,
    getSpeed,
  };
}
