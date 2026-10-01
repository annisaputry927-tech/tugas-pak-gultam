/* =====================================================
   PAWPASTEL PETSHOP
   JAVASCRIPT UTAMA
===================================================== */


/* ================= DATA PRODUK ================= */

const products = [

    {
        id: 1,
        name: "Whiskas Tuna",
        category: "kucing",
        price: 28000,
        icon: "🐱",
        description: "Makanan kucing rasa tuna."
    },

    {
        id: 2,
        name: "Royal Canin",
        category: "kucing",
        price: 85000,
        icon: "🐱",
        description: "Makanan premium untuk kucing."
    },

    {
        id: 3,
        name: "Pasir Wangi",
        category: "kucing",
        price: 35000,
        icon: "🐱",
        description: "Pasir kucing dengan aroma lembut."
    },

    {
        id: 4,
        name: "Dog Food Premium",
        category: "anjing",
        price: 95000,
        icon: "🐶",
        description: "Makanan bergizi untuk anjing."
    },

    {
        id: 5,
        name: "Dog Treat",
        category: "anjing",
        price: 32000,
        icon: "🦴",
        description: "Camilan favorit anjing."
    },

    {
        id: 6,
        name: "Kalung Anjing",
        category: "anjing",
        price: 45000,
        icon: "🐶",
        description: "Kalung nyaman dan lucu."
    },

    {
        id: 7,
        name: "Hamster Food",
        category: "hamster",
        price: 27000,
        icon: "🐹",
        description: "Makanan khusus hamster."
    },

    {
        id: 8,
        name: "Rumah Hamster",
        category: "hamster",
        price: 55000,
        icon: "🏠",
        description: "Rumah mini untuk hamster."
    },

    {
        id: 9,
        name: "Mainan Hamster",
        category: "hamster",
        price: 30000,
        icon: "🐹",
        description: "Mainan untuk aktivitas hamster."
    },

    {
        id: 10,
        name: "Rabbit Food",
        category: "kelinci",
        price: 42000,
        icon: "🐰",
        description: "Makanan sehat untuk kelinci."
    },

    {
        id: 11,
        name: "Hay Kelinci",
        category: "kelinci",
        price: 38000,
        icon: "🌿",
        description: "Hay berkualitas untuk kelinci."
    },

    {
        id: 12,
        name: "Mainan Kelinci",
        category: "kelinci",
        price: 25000,
        icon: "🐰",
        description: "Mainan aman untuk kelinci."
    },

    {
        id: 13,
        name: "Otter Snack",
        category: "otter",
        price: 65000,
        icon: "🦦",
        description: "Camilan untuk otter."
    },

    {
        id: 14,
        name: "Otter Food",
        category: "otter",
        price: 90000,
        icon: "🦦",
        description: "Makanan khusus otter."
    },

    {
        id: 15,
        name: "Mainan Air Otter",
        category: "otter",
        price: 47000,
        icon: "🌊",
        description: "Mainan air untuk otter."
    }

];


/* ================= STATE ================= */

let cart = [];

let currentCategory = "all";

let currentUser = "";

let map = null;


/* ================= HELPER ================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* ================= DOM ================= */

const loginOverlay =
    document.getElementById("loginOverlay");

const appContainer =
    document.getElementById("appContainer");

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const displayUsername =
    document.getElementById("displayUsername");

const btnLogout =
    document.getElementById("btnLogout");

const productGrid =
    document.getElementById("productGrid");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const subtotalAmount =
    document.getElementById("subtotalAmount");

const discountAmount =
    document.getElementById("discountAmount");

const taxAmount =
    document.getElementById("taxAmount");

const totalAmount =
    document.getElementById("totalAmount");

const btnCheckout =
    document.getElementById("btnCheckout");

const btnExportExcel =
    document.getElementById("btnExportExcel");

const searchInput =
    document.getElementById("searchInput");

const songSelect =
    document.getElementById("songSelect");

const videoPlayer =
    document.getElementById("videoPlayer");

const receiptModal =
    document.getElementById("receiptModal");

const receiptDetails =
    document.getElementById("receiptDetails");

const receiptNo =
    document.getElementById("receiptNo");

const receiptDate =
    document.getElementById("receiptDate");

const receiptCustomer =
    document.getElementById("receiptCustomer");

const rSubtotal =
    document.getElementById("rSubtotal");

const rDiscount =
    document.getElementById("rDiscount");

const rTax =
    document.getElementById("rTax");

const rTotal =
    document.getElementById("rTotal");

const btnCloseReceipt =
    document.getElementById("btnCloseReceipt");

const btnPrintReceipt =
    document.getElementById("btnPrintReceipt");


/* ================= LOGIN ================= */

/* ================= LOGIN ================= */

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "admin" || password === "12345") {
        alert("Username dan password wajib diisi!");
        return;
    }

    currentUser = username;

    displayUsername.textContent = currentUser;

    loginOverlay.classList.add("hidden");
    appContainer.classList.remove("hidden");

    renderProducts();
    initializeMap();
});
/* ================= LOGOUT ================= */

btnLogout.addEventListener("click", function() {

    const confirmLogout =
        confirm("Apakah Anda yakin ingin keluar?");

    if (!confirmLogout) return;


    cart = [];

    currentUser = "";


    appContainer.classList.add("hidden");

    loginOverlay.classList.remove("hidden");


    usernameInput.value = "";

    passwordInput.value = "";


    updateCart();

});


/* ================= PRODUCT ================= */

function renderProducts() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredProducts =
        products.filter(product => {

            const matchCategory =
                currentCategory === "all" ||
                product.category === currentCategory;


            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(search);


            return matchCategory && matchSearch;

        });


    if (filteredProducts.length === 0) {

        productGrid.innerHTML = `
            <div class="no-product">
                <i class="fa-solid fa-box-open"></i>
                <h3>Produk tidak ditemukan</h3>
                <p>Coba gunakan kata kunci lain.</p>
            </div>
        `;

        return;

    }


    productGrid.innerHTML =
        filteredProducts.map(product => `

            <article class="product-card">

                <div class="product-image">
                    ${product.icon}
                </div>

                <div class="product-info">

                    <span class="product-type">
                        ${product.category}
                    </span>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${formatRupiah(product.price)}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${product.id})"
                            title="Tambah ke keranjang">

                            <i class="fa-solid fa-plus"></i>

                        </button>

                    </div>

                </div>

            </article>

        `).join("");

}


/* ================= CATEGORY ================= */

document.querySelectorAll(".category-btn")
    .forEach(button => {

        button.addEventListener("click", function() {

            document
                .querySelectorAll(".category-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );


            this.classList.add("active");


            currentCategory =
                this.dataset.category;


            renderProducts();

        });

    });


/* ================= SEARCH ================= */

searchInput.addEventListener(
    "input",
    renderProducts
);


/* ================= ADD CART ================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();


    showAddedMessage(product.name);

}


/* ================= NOTIFICATION ================= */

function showAddedMessage(name) {

    const notification =
        document.createElement("div");


    notification.textContent =
        `✓ ${name} ditambahkan ke keranjang`;


    notification.style.position =
        "fixed";

    notification.style.right =
        "20px";

    notification.style.bottom =
        "20px";

    notification.style.zIndex =
        "10000";

    notification.style.background =
        "#7958aa";

    notification.style.color =
        "white";

    notification.style.padding =
        "13px 18px";

    notification.style.borderRadius =
        "14px";

    notification.style.fontWeight =
        "700";

    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.2)";


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.remove();

    }, 1800);

}


/* ================= UPDATE CART ================= */

function updateCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <p>
                    Keranjang masih kosong
                </p>

                <small>
                    Pilih produk untuk mulai berbelanja.
                </small>

            </div>

        `;

    } else {

        cartItems.innerHTML =
            cart.map(item => `

                <div class="cart-item">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>


                    <div>

                        <div class="cart-item-name">
                            ${item.name}
                        </div>

                        <div class="cart-item-price">
                            ${formatRupiah(item.price)}
                        </div>


                        <div class="quantity-controls">

                            <button
                                onclick="changeQuantity(${item.id}, -1)">
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)">
                                +
                            </button>

                            <button
                                class="remove-cart"
                                onclick="removeFromCart(${item.id})"
                                title="Hapus">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </div>

                    </div>


                    <div class="cart-item-total">
                        ${formatRupiah(
                            item.price * item.quantity
                        )}
                    </div>

                </div>

            `).join("");

    }


    calculateTotal();

}


/* ================= QUANTITY ================= */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== productId
            );

    }


    updateCart();

}


/* ================= REMOVE ================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    updateCart();

}


/* ================= CALCULATION ================= */

function calculateTotal() {

    const subtotal =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const discount =
        subtotal * 0.10;


    const afterDiscount =
        subtotal - discount;


    const tax =
        afterDiscount * 0.11;


    const total =
        afterDiscount + tax;


    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    subtotalAmount.textContent =
        formatRupiah(subtotal);


    discountAmount.textContent =
        "- " + formatRupiah(discount);


    taxAmount.textContent =
        formatRupiah(tax);


    totalAmount.textContent =
        formatRupiah(total);


    cartCount.textContent =
        totalItems;


    btnCheckout.disabled =
        cart.length === 0;


    btnExportExcel.disabled =
        cart.length === 0;


    return {

        subtotal,
        discount,
        tax,
        total

    };

}


/* ================= CHECKOUT ================= */

btnCheckout.addEventListener(
    "click",
    openReceipt
);


function openReceipt() {

    if (cart.length === 0) {

        alert("Keranjang masih kosong.");

        return;

    }


    const totals =
        calculateTotal();


    const invoice =
        generateInvoice();


    const now =
        new Date();


    const date =
        now.toLocaleString(
            "id-ID",
            {
                dateStyle: "full",
                timeStyle: "short"
            }
        );


    receiptNo.textContent =
        invoice;


    receiptDate.textContent =
        date;


    receiptCustomer.textContent =
        currentUser;


    receiptDetails.innerHTML =
        cart.map(item => `

            <div class="receipt-product">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${formatRupiah(
                        item.price * item.quantity
                    )}
                </strong>

            </div>

        `).join("");


    rSubtotal.textContent =
        formatRupiah(totals.subtotal);


    rDiscount.textContent =
        "- " + formatRupiah(totals.discount);


    rTax.textContent =
        formatRupiah(totals.tax);


    rTotal.textContent =
        formatRupiah(totals.total);


    receiptModal.classList.remove("hidden");

}


/* ================= CLOSE RECEIPT ================= */

btnCloseReceipt.addEventListener(
    "click",
    function() {

        receiptModal.classList.add("hidden");

    }
);


/* Klik luar modal */

receiptModal.addEventListener(
    "click",
    function(event) {

        if (event.target === receiptModal) {

            receiptModal.classList.add("hidden");

        }

    }
);


/* ================= PRINT ================= */

btnPrintReceipt.addEventListener(
    "click",
    function() {

        window.print();

    }
);


/* ================= INVOICE ================= */

function generateInvoice() {

    const now =
        new Date();


    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );


    return `INV-${now.getFullYear()}${String(
        now.getMonth() + 1
    ).padStart(2, "0")}${String(
        now.getDate()
    ).padStart(2, "0")}-${random}`;

}


/* ================= EXCEL ================= */

btnExportExcel.addEventListener(
    "click",
    exportToExcel
);


function exportToExcel() {

    if (cart.length === 0) {

        alert("Tidak ada transaksi.");

        return;

    }


    if (typeof XLSX === "undefined") {

        alert(
            "Library Excel belum berhasil dimuat."
        );

        return;

    }


    const totals =
        calculateTotal();


    const invoice =
        generateInvoice();


    const rows = [];


    rows.push({

        "No. Nota":
            invoice,

        "Tanggal":
            new Date().toLocaleString("id-ID"),

        "Pelanggan":
            currentUser,

        "Keterangan":
            "TRANSAKSI PAWPASTEL"

    });


    rows.push({});


    rows.push({

        "Produk":
            "Produk",

        "Kategori":
            "Kategori",

        "Harga":
            "Harga",

        "Jumlah":
            "Jumlah",

        "Total":
            "Total"

    });


    cart.forEach(item => {

        rows.push({

            "Produk":
                item.name,

            "Kategori":
                item.category,

            "Harga":
                item.price,

            "Jumlah":
                item.quantity,

            "Total":
                item.price * item.quantity

        });

    });


    rows.push({});


    rows.push({

        "Produk":
            "Subtotal",

        "Total":
            totals.subtotal

    });


    rows.push({

        "Produk":
            "Diskon 10%",

        "Total":
            totals.discount

    });


    rows.push({

        "Produk":
            "PPN 11%",

        "Total":
            totals.tax

    });


    rows.push({

        "Produk":
            "TOTAL PEMBAYARAN",

        "Total":
            totals.total

    });


    const worksheet =
        XLSX.utils.json_to_sheet(
            rows,
            {
                skipHeader: false
            }
        );


    const workbook =
        XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Transaksi"
    );


    XLSX.writeFile(
        workbook,
        `${invoice}.xlsx`
    );

}


/* ================= MUSIC ================= */

songSelect.addEventListener(
    "change",
    function() {

        const videoId =
            this.value;


        videoPlayer.src =
            `https://www.youtube.com/embed/${videoId}`;

    }
);


/* ================= MAP ================= */

function initializeMap() {

    if (map !== null) {

        setTimeout(() => {

            map.invalidateSize();

        }, 300);

        return;

    }


    if (
        typeof L === "undefined"
    ) {

        return;

    }


    /*
       Koordinat contoh area Medan.
       Bisa diganti dengan koordinat toko
       sebenarnya jika diperlukan.
    */

    const latitude =
        3.5952;

    const longitude =
        98.6722;


    map =
        L.map("map").setView(
            [
                latitude,
                longitude
            ],
            14
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    L.marker([
        latitude,
        longitude
    ])
    .addTo(map)
    .bindPopup(`
        <strong>PawPastel Petshop</strong>
        <br>
        Jl. Pastel Ceria No. 88, Medan
    `)
    .openPopup();


}


/* ================= START ================= */

updateCart();


/*
   Jangan langsung membuka aplikasi.
   User harus login terlebih dahulu.
*/

console.log(
    "PawPastel berhasil dimuat."
);
