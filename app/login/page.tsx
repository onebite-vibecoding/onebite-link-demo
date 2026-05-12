"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  type ToastAnchor = "submit" | "kakao";
  const [toast, setToast] = useState<{ message: string; anchor: ToastAnchor } | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormFilled = email.trim() !== "" && password !== "";

  const showToast = (message: string, anchor: ToastAnchor = "submit") => {
    setToast({ message, anchor });
    setTimeout(() => setToast(null), 5000);
  };

  const handleKakaoLogin = async () => {
    showToast("데모 버전에서는 제공된 테스트 계정으로만 로그인이 가능합니다.", "kakao");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    if (email.trim().toLowerCase() !== "test@gmail.com" || password !== "123456") {
      showToast("데모 버전에서는 제공된 테스트 계정으로만 로그인이 가능합니다.", "submit");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials") || error.message.includes("invalid_credentials")) {
        showToast("이메일 또는 비밀번호가 올바르지 않습니다.", "submit");
      } else if (error.message.includes("Email not confirmed")) {
        showToast("이메일 인증이 완료되지 않았습니다.", "submit");
      } else {
        showToast("로그인에 실패했습니다. 다시 시도해 주세요.", "submit");
      }
      return;
    }

    router.push("/");
  };

  const Bubble = ({ message }: { message: string }) => (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-max max-w-[260px]">
      <div className="bg-[var(--text)] text-white text-xs pl-3 pr-1.5 py-2 rounded-lg shadow-lg flex items-start gap-2 leading-snug">
        <span className="flex-1 text-center pt-px">{message}</span>
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
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-8">
          한입 링크
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-base"
          />
          <div className="relative mt-1">
            {toast?.anchor === "submit" && <Bubble message={toast.message} />}
            <button
              type="submit"
              disabled={!isFormFilled || loading}
              className="btn-accent w-full py-2 rounded-md text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "처리 중..." : "로그인"}
            </button>
          </div>
          <div className="relative mt-1">
            {toast?.anchor === "kakao" && <Bubble message={toast.message} />}
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="w-full"
            >
              <Image
                src="/kakao_login_large_wide.png"
                alt="카카오 로그인"
                width={300}
                height={45}
                className="w-full h-auto"
              />
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-[var(--text-sub)] mt-4">
          <Link href="/forgot-password" className="text-[var(--accent)] hover:underline">
            비밀번호 찾기
          </Link>
        </p>
        <p className="text-center text-sm text-[var(--text-sub)] mt-2">
          계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
