import React, { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    if (typeof window !== "undefined" && !user) {
        const access = localStorage.getItem('dalim_user');

        if (access) {
            setUser(JSON.parse(access));
        }
    }

    const login = async (data) => {
        const url = process.env.NEXT_PUBLIC_API_URL + "accounts/login/";
        const response = await fetch(url, {
            method: "POST",
            body: data,
        });
    
        // result 결과가 200이면 로그인 성공
        if (response.status === 200) {
        const result = await response.json();
        console.log(result);

        localStorage.setItem('dalim_access', result.access_token);
        localStorage.setItem('dalim_refresh', result.refresh_token);
        localStorage.setItem('dalim_user', JSON.stringify(result.user));

        setUser(result.user);

        // /accounts/mypage/로 router.push
        router.push("/accounts/mypage/");
        } else {
        alert("로그인 실패");
        console.error(response);
        }
    };

    const signup = async (data) => {
        const url = process.env.NEXT_PUBLIC_API_URL + "accounts/signup/";
        const response = await fetch(url, {
            method: "POST",
            body: data,
        });

        if (response.status === 201) {
            router.push("/accounts/login/");
        } else {
            alert("회원가입 실패");
            console.error(response);
        }
    };

    const refresh_token = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL + "accounts/token/refresh/";
        const data = {refresh : localStorage.getItem('dalim_refresh')};
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log(`토큰갱신 : ${result}`);

            localStorage.setItem('dalim_access', result.access);
            localStorage.setItem('dalim_access_expiration', result.access_token_expiration);
        } else {
            alert("토큰 갱신 실패");
            console.error(response);
        }
    };

    const logout = async () => {
        const url = process.env.NEXT_PUBLIC_API_URL + "accounts/logout/";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('dalim_access')}`,
            },
        });

        if (response.status === 200) {
            localStorage.removeItem('dalim_access');
            localStorage.removeItem('dalim_refresh');
            localStorage.removeItem('dalim_user');
            setUser(null);
            router.push("/");
        } else if (response.status === 401) {
            console.log("토큰 재요청");
            await refresh_token();
            await logout();
        }else {
            alert("로그아웃 실패");
            console.error(response);
        }
    };


return (
    <AuthContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            signup,
            refresh_token,
    }}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;