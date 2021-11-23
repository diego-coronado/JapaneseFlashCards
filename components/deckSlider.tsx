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
    if (index - 1 > 0) {
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
    <div className="flex flex-col w-full h-60 border border-gray-400 rounded-md mx-auto sm:w-96 sm:mx-0">
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
          <Button
            title={showFrontFirst ? "Front first" : "Back first"}
            onClick={() => setShowFrontFirst((prev) => !prev)}
            className={clsx({
              "bg-gray-300": showFrontFirst,
            })}
          />
        )}
        <Button title="Next" onClick={clickNext} />
      </div>
      <div className="text-xl text-center w-full h-full">
        {showBoth ? (
          <div className="flex flex-col divide-y divide-gray-400 divide-solid w-full h-full">
            <div className="flex-1 flex items-center justify-center">
              {front(shuffledList[index])}
            </div>
            <div className="flex-1 flex items-center justify-center">
              {back(shuffledList[index])}
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer h-full flex items-center justify-center"
            onClick={() => setShowFront((prev) => !prev)}
          >
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
