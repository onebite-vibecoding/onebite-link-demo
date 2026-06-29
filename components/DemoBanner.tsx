"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "demo:banner:dismissed";

export default function DemoBanner() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  const handleReset = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("demo:folders:") || key.startsWith("demo:links:"))
      .forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <>
      <div className="w-full bg-amber-100 text-amber-900 text-xs sm:text-sm border-b border-amber-200">
        <div className="relative px-4 py-2 pr-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="text-center">
            데모 버전입니다. 폴더·링크의 추가·수정·삭제는 브라우저 로컬스토리지에만 저장되며 실제 서버에는 반영되지 않습니다.
          </span>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="shrink-0 px-2.5 py-1 rounded border border-amber-300 bg-amber-50 hover:bg-amber-200 text-amber-900 text-xs font-medium"
          >
            서버 데이터로 초기화
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="배너 닫기"
            title="배너 닫기 (다시 표시하지 않음)"
            className="absolute right-2 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-amber-200 text-amber-900 text-base leading-none"
          >
            ×
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="bg-[var(--card)] rounded-[10px] shadow-lg p-6 w-80 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-[var(--text)]">서버 데이터로 초기화</h2>
            <p className="text-sm text-[var(--text-sub)]">
              로컬에 저장된 변경 사항을 모두 지우고 서버 원본 데이터로 되돌립니다. 계속하시겠습니까?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-1.5 text-sm font-medium rounded-[6px] text-[var(--text-sub)] nav-item transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 text-sm font-medium rounded-[6px] bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
