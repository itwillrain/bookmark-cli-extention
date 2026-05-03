import { type Dispatch, type SetStateAction, useState } from "react";
import { type ResultCursorIndex, resultCursorCleared } from "../../domain/bookmarks/result-cursor";

/** Result cursor state tuple。 */
type ResultCursorState = [ResultCursorIndex, Dispatch<SetStateAction<ResultCursorIndex>>];

/** 初期result cursor。 */
const initialResultCursor: ResultCursorIndex = resultCursorCleared;

/**
 * Result cursor stateを作成。
 * @returns {ResultCursorState} Result cursor state tuple。
 */
export const useResultCursorState = (): ResultCursorState =>
  useState<ResultCursorIndex>(initialResultCursor);
