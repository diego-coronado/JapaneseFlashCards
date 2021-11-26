import clsx from "clsx";
import { useCallback, useState } from "react";
import { shuffle } from "../lib/util";
import Button from "./button";

function DeckSlider({
  list,
  front,
  back,
}: {
  list: any[];
  front: Function;
  back: Function;
}) {
  const [shuffledList, setShuffledList] = useState(list);
  const [index, setIndex] = useState(0);
  const [showBoth, setShowBoth] = useState(false);
  const [showFront, setShowFront] = useState(true);
  const [showFrontFirst, setShowFrontFirst] = useState(true);

  const shuffleList = useCallback(() => {
    let shuffled = [...shuffledList];
    shuffle(shuffled);
    setShuffledList(shuffled);
    setIndex(0);
  }, [shuffledList]);

  const clickPrevious = useCallback(() => {
    if (index - 1 >= 0) {
      setIndex((prev) => prev - 1);
      setShowFront(true);
    }
  }, [index]);

  const clickNext = useCallback(() => {
    if (index + 1 < list.length) {
      setIndex((prev) => prev + 1);
      setShowFront(true);
    }
  }, [index, list]);

  return (
    <div className="flex flex-col w-full min-h-60 border border-gray-400 rounded-md mx-auto sm:w-auto sm:mx-0">
      <div className="flex items-center text-xs border-b border-gray-400 py-2 flex-wrap gap-1 px-2">
        <Button title="Previous" onClick={clickPrevious} />
        <Button title="Shuffle" onClick={shuffleList} />
        <Button
          title="Front only"
          onClick={() => setShowBoth(false)}
          className={clsx({
            "bg-gray-300": !showBoth,
          })}
        />
        <Button
          title="Both Sides"
          onClick={() => setShowBoth(true)}
          className={clsx({
            "bg-gray-300": showBoth,
          })}
        />
        {!showBoth && (
          <>
            <Button
              title={showFrontFirst ? "Front first" : "Back first"}
              onClick={() => setShowFrontFirst((prev) => !prev)}
              className={clsx({
                "bg-gray-300": showFrontFirst,
              })}
            />
            <Button
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                </svg>
              }
              onClick={() => setShowFront((prev) => !prev)}
            />
          </>
        )}
        <Button title="Next" onClick={clickNext} />
      </div>
      <div className="text-xl text-center w-full h-full">
        {showBoth ? (
          <div className="flex flex-col divide-y divide-gray-400 divide-solid w-full h-full">
            <div className="flex-1 flex items-center justify-center min-h-15">
              {front(shuffledList[index])}
            </div>
            <div className="flex-1 flex items-center justify-center min-h-15">
              {back(shuffledList[index])}
            </div>
          </div>
        ) : (
          <div className="cursor-pointer h-full flex items-center justify-center relative">
            {showFront ? (
              <>
                {showFrontFirst ? (
                  <>{front(shuffledList[index])}</>
                ) : (
                  <>{back(shuffledList[index])}</>
                )}
              </>
            ) : (
              <>
                {showFrontFirst ? (
                  <>{back(shuffledList[index])}</>
                ) : (
                  <>{front(shuffledList[index])}</>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeckSlider;
