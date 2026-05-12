"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormFilled = password !== "" && passwordConfirm !== "";

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;

    if (password !== passwordConfirm) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      if (error.message.includes("weak") || error.message.includes("password")) {
        showToast("비밀번호는 6자 이상이어야 합니다.");
      } else {
        showToast("비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.");
      }
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--text)] text-white text-sm px-4 py-2.5 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-2">
          한입 링크
        </h1>
        <p className="text-sm text-[var(--text-sub)] text-center mb-8">새 비밀번호 설정</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-base"
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="input-base"
          />
          <button
            type="submit"
            disabled={!isFormFilled || loading}
            className="btn-accent w-full py-2 rounded-md text-sm font-medium mt-1 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "처리 중..." : "비밀번호 재설정"}
          </button>
        </form>
      </div>
    </div>
  );
}
