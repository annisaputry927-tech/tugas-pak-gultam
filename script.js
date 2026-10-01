document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");
    const errorUsername = document.getElementById("errorUsername");
    const errorPassword = document.getElementById("errorPassword");
    const alertBox = document.getElementById("alertBox");
    const strengthContainer = document.getElementById("strengthContainer");
    const strengthBar = document.getElementById("strengthBar");

    // 1. TOGGLE SHOW/HIDE PASSWORD
    togglePasswordBtn.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Toggle Icon
        togglePasswordBtn.classList.toggle("fa-eye-slash");
        togglePasswordBtn.classList.toggle("fa-eye");
    });

    // 2. CHECK PASSWORD STRENGTH REAL-TIME
    passwordInput.addEventListener("input", () => {
        const val = passwordInput.value;
        if (val.length > 0) {
            strengthContainer.style.display = "block";
            const score = calculateStrength(val);
            
            if (score <= 1) {
                strengthBar.style.width = "33%";
                strengthBar.style.backgroundColor = "var(--error-color)";
            } else if (score === 2) {
                strengthBar.style.width = "66%";
                strengthBar.style.backgroundColor = "#ffaa00";
            } else {
                strengthBar.style.width = "100%";
                strengthBar.style.backgroundColor = "var(--success-color)";
            }
        } else {
            strengthContainer.style.display = "none";
        }
    });

    function calculateStrength(pass) {
        let score = 0;
        if (pass.length >= 6) score++;
        if (pass.match(/[A-Z]/) && pass.match(/[0-9]/)) score++;
        if (pass.match(/[^a-zA-Z0-9]/)) score++;
        return score;
    }

    // 3. FORM VALIDATION & SUBMIT
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Reset status error
        errorUsername.innerText = "";
        errorPassword.innerText = "";
        alertBox.className = "alert-box";
        alertBox.style.display = "none";

        let isValid = true;

        // Validasi Username/Email
        if (usernameInput.value.trim() === "") {
            errorUsername.innerText = "⚠️ Username atau Email Wajib diisi!";
            isValid = false;
        }

        // Validasi Password
        if (passwordInput.value.trim() === "") {
            errorPassword.innerText = "⚠️ Kata sandi tidak boleh kosong!";
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            errorPassword.innerText = "⚠️ Kata sandi minimal 6 karakter!";
            isValid = false;
        }

        // Jalankan Simulasi Login jika valid
        if (isValid) {
            simulateLogin();
        }
    });

    // 4. SIMULASI PROSES LOGIN
    function simulateLogin() {
        const btnLogin = document.getElementById("btnLogin");
        const btnText = btnLogin.querySelector(".btn-text");

        // UI Loading
        btnLogin.disabled = true;
        btnText.innerText = "MEMPROSES...";

        setTimeout(() => {
            // Simulasi respon sukses jika username = admin
            if (usernameInput.value.trim().toLowerCase() === "admin") {
                showAlert("Akses Diterima! Mengalihkan halaman...", "success");
                setTimeout(() => {
                    alert("Login Berhasil! Selamat datang Kembali VIP Member.");
                }, 1000);
            } else {
                showAlert("Username atau Kata Sandi Salah!", "error");
            }

            // Restore UI
            btnLogin.disabled = false;
            btnText.innerText = "MASUK KE PORTAL";
        }, 1500);
    }

    function showAlert(message, type) {
        alertBox.innerText = message;
        alertBox.className = `alert-box ${type}`;
        alertBox.style.display = "block";
    }
});