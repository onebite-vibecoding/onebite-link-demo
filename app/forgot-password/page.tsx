"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast("데모 버전에서는 비밀번호 찾기를 사용할 수 없습니다. 제공된 테스트 계정으로 로그인해 주세요.");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-2">
          한입 링크
        </h1>
        <p className="text-sm text-[var(--text-sub)] text-center mb-8">비밀번호 찾기</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
          />
          <div className="relative mt-1">
            {toast && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-max max-w-[260px]">
                <div className="bg-[var(--text)] text-white text-xs pl-3 pr-1.5 py-2 rounded-lg shadow-lg flex items-start gap-2 leading-snug">
                  <span className="flex-1 text-center pt-px">{toast}</span>
                  <button
                    type="button"
                    onClick={() => setToast(null)}
                    aria-label="닫기"
                    className="shrink-0 -mt-0.5 w-5 h-5 inline-flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-white/10 leading-none text-base"
                  >
                    ×
                  </button>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[var(--text)] rotate-45"></div>
              </div>
            )}
            <button
              type="submit"
              disabled={!email.trim()}
              className="btn-accent w-full py-2 rounded-md text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              비밀번호 재설정 링크 발송
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-[var(--text-sub)] mt-4">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
