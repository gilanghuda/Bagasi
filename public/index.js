'use strict'
let idUser = "";
let namaUser = "";
let emailUser = "";
let alamatUser = "";
let tanggalLahirUser = "";
const startapp = async () => {
  try {
    const respon = await fetch("/userInfo");
    if (respon.status !== 200) {
      return
    }
    const data = await respon.json();
    idUser = data.payload.datas[0].userid;
    namaUser = data.payload.datas[0].nama;
    emailUser = data.payload.datas[0].email;
    alamatUser = data.payload.datas[0].alamat;
    tanggalLahirUser = data.payload.datas[0].tanggal_lahir;

    console.log(idUser);
    console.log(namaUser);

    document.getElementById("halo-user").innerHTML = `hallo, bunda ${namaUser}`
    document.getElementById("profil-user").src = `image/${idUser}`
  } catch (error) {
    console.log(error);
  }
};

startapp();

// untuk menampilkan navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    //jika login-btn ditekan maka akan muncul
    document.getElementById("login-btn").addEventListener("click", function () {
      document.getElementById("login-page").classList.toggle("hidden"); // Toggle visibility of login page
    });

    document
      .getElementById("login-selesai-btn")
      .addEventListener("click", function () {
        document.getElementById("login-page").classList.add("hidden");
      });

    document.getElementById("close-btn").addEventListener("click", function () {
      document.getElementById("login-page").classList.add("hidden");
    });

    //untuk daftar-btn
    document
      .getElementById("daftar-btn")
      .addEventListener("click", function () {
        document.getElementById("daftar-page").classList.remove("hidden");
      });

    document
      .getElementById("daftarLogin-btn")
      .addEventListener("click", function () {
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("daftar-page").classList.remove("hidden");
      });

    document
      .getElementById("daftar-selesai-btn")
      .addEventListener("click", function () {
        document.getElementById("daftar-page").classList.add("hidden");
      });

    document
      .getElementById("close-2-btn")
      .addEventListener("click", function () {
        document.getElementById("daftar-page").classList.add("hidden");
      });

    // Add event listener to profile button
    document
      .getElementById("profile-btn")
      .addEventListener("click", function () {
        document.getElementById("home-page").classList.add("hidden"); // Hide main content
        document.getElementById("bagasi-content").classList.add("hidden"); // Hide main content
        document.getElementById("donate-content").classList.add("hidden");
        document.getElementById("artikel-content").classList.add("hidden");
        document.getElementById("about-content").classList.add("hidden");
        document.getElementById("contact-content").classList.add("hidden");
        document.getElementById("profile-content").classList.remove("hidden");
      });

    //pindah navbar
    document.getElementById("home-btn").addEventListener("click", function () {
      document.getElementById("profile-content").classList.add("hidden");
      document.getElementById("contact-content").classList.add("hidden");
      document.getElementById("about-content").classList.add("hidden");
      document.getElementById("bagasi-content").classList.add("hidden");
      document.getElementById("donate-content").classList.add("hidden");
      document.getElementById("artikel-content").classList.add("hidden");
      document.getElementById("home-page").classList.remove("hidden");
    });

    document
      .getElementById("bagasi-btn")
      .addEventListener("click", function () {
        document.getElementById("home-page").classList.add("hidden"); // Hide main content
        document.getElementById("profile-content").classList.add("hidden");
        document.getElementById("contact-content").classList.add("hidden");
        document.getElementById("about-content").classList.add("hidden");
        document.getElementById("donate-content").classList.add("hidden");
        document.getElementById("artikel-content").classList.add("hidden");
        document.getElementById("bagasi-content").classList.remove("hidden");
      });

    document
      .getElementById("donate-btn")
      .addEventListener("click", function () {
        document.getElementById("home-page").classList.add("hidden"); // Hide main content
        document.getElementById("profile-content").classList.add("hidden");
        document.getElementById("contact-content").classList.add("hidden");
        document.getElementById("about-content").classList.add("hidden");
        document.getElementById("bagasi-content").classList.add("hidden");
        document.getElementById("artikel-content").classList.add("hidden");
        document.getElementById("donate-content").classList.remove("hidden");
      });

    document
      .getElementById("artikel-btn")
      .addEventListener("click", function () {
        document.getElementById("home-page").classList.add("hidden"); // Hide main content
        document.getElementById("profile-content").classList.add("hidden");
        document.getElementById("contact-content").classList.add("hidden");
        document.getElementById("about-content").classList.add("hidden");
        document.getElementById("donate-content").classList.add("hidden");
        document.getElementById("bagasi-content").classList.add("hidden");
        document.getElementById("artikel-content").classList.remove("hidden");
      });

    document.getElementById("about-btn").addEventListener("click", function () {
      document.getElementById("home-page").classList.add("hidden"); // Hide main content
      document.getElementById("profile-content").classList.add("hidden");
      document.getElementById("contact-content").classList.add("hidden");
      document.getElementById("bagasi-content").classList.add("hidden");
      document.getElementById("donate-content").classList.add("hidden");
      document.getElementById("artikel-content").classList.add("hidden");
      document.getElementById("about-content").classList.remove("hidden");
    });

    document
      .getElementById("contact-btn")
      .addEventListener("click", function () {
        document.getElementById("home-page").classList.add("hidden"); // Hide main content
        document.getElementById("profile-content").classList.add("hidden");
        document.getElementById("about-content").classList.add("hidden");
        document.getElementById("bagasi-content").classList.add("hidden");
        document.getElementById("donate-content").classList.add("hidden");
        document.getElementById("artikel-content").classList.add("hidden");
        document.getElementById("contact-content").classList.remove("hidden");
      });
  });

//profile page
fetch("profile.html")
  .then((response) => response.text())
  .then((profileContent) => {
    document.getElementById("profile-content").innerHTML = profileContent; // Load profile content
    //document.getElementById('login-page').classList.add('hidden'); // Hide login page if visible

    //profile button upload-btn coba ganti profile-pic
    document
      .getElementById("profile-pic")
      .addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("choice-modal").classList.remove("hidden"); // Show modal
      });

    document
      .getElementById("choose-gallery")
      .addEventListener("click", function () {
        document.getElementById("choice-modal").classList.add("hidden"); // Hide modal
        document.getElementById("file-input").click();
      });

    document
      .getElementById("choose-camera")
      .addEventListener("click", function () {
        document.getElementById("choice-modal").classList.add("hidden"); // Hide modal
        openCamera();
      });

    function openCamera() {
      document.getElementById("camera-modal").classList.remove("hidden"); // Show camera modal
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = document.getElementById("video");
          video.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error accessing camera: " + err);
        });
    }

    document
      .getElementById("take-photo")
      .addEventListener("click", function () {
        const video = document.getElementById("video");
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        document.getElementById("profile-pic").src = dataUrl;
        closeCamera();
      });

    document
      .getElementById("close-camera")
      .addEventListener("click", closeCamera);

    function closeCamera() {
      document.getElementById("camera-modal").classList.add("hidden"); // Hide camera modal
      const video = document.getElementById("video");
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }

    document
      .getElementById("file-input")
      .addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            // const reader = new FileReader();
            // reader.onload = function(e) {
            // document.getElementById('profile-pic').src = e.target.result;
            // }
            // reader.readAsDataURL(file);
          // Upload the image to the server
          const formData = new FormData();
          formData.append("avatar", file); // 'avatar' matches the Multer field name on the backend

          fetch("/profilepict", {
            method: "POST",
            body: formData,
            credentials: "include", // Send cookies if JWT is in cookies
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.filename) {
                document.getElementById(
                  "profile-pic"
                ).src = `image/${idUser}`; // Update image src with server path
              } else {
                console.error(
                  "Error uploading image:",
                  data.message || "Unknown error"
                );
              }
            })
            .catch((error) => console.error("Error:", error));
        }
      });

    //untuk pdf file
    document
      .getElementById("pdf-upload")
      .addEventListener("change", function (event) {
        const file = event.target.files[0];
        const fileStatus = document.getElementById("file-status");
        const pdfLink = document.getElementById("pdf-link");

        if (file) {
          const fileType = file.type;
          const validTypes = ["application/pdf"];

          if (!validTypes.includes(fileType)) {
            fileStatus.textContent =
              "File yang diunggah bukan PDF. Silakan unggah file PDF.";
            event.target.value = ""; // Reset input file
            pdfLink.classList.add("hidden");
          } else {
            fileStatus.textContent = ".";
            const fileURL = URL.createObjectURL(file);
            pdfLink.href = fileURL;
            pdfLink.textContent = file.name;
            pdfLink.classList.remove("hidden");
          }
        } else {
          fileStatus.textContent = "";
          pdfLink.classList.add("hidden");
        }
      });

    //untuk tanggal lahir sendiri
    //belum ya

    //data untuk family page
    // Array to store family data
    let familyData = [];

    // Get DOM elements
    const tambahFamilyPage = document.getElementById("tambah-family-page");
    const tambahFamilyBtn = document.getElementById("tambah-family-btn");
    const closeTambahFamilyBtn = document.getElementById(
      "closeTambahFamily-btn"
    );
    const simpanFamilyBtn = document.getElementById("simpan-family-btn");
    const inputNama = document.getElementById("input-nama-family");
    const inputLahir = document.getElementById("input-lahir-family");
    const inputFoto = document.getElementById("input-foto-family");
    const familyListDiv = document.getElementById("family-list");

    // Show the "Tambah Family" page
    tambahFamilyBtn.addEventListener("click", function () {
      tambahFamilyPage.classList.remove("hidden");
    });

    // Close the "Tambah Family" page
    closeTambahFamilyBtn.addEventListener("click", function () {
      tambahFamilyPage.classList.add("hidden");
    });

    // Function to display the family list
    // Function to display the family list

    document
      .getElementById("input-lahir-family")
      .addEventListener("change", function () {
        const dateInput = this.value;
        const dateObject = new Date(dateInput);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = dateObject.toLocaleDateString("id-ID", options); // 'id-ID' for Indonesian locale

        // Display the formatted date
        document.getElementById("formattedDate").textContent = formattedDate;

        // Update the input field with formatted date
        this.type = "text";
        this.value = formattedDate;
      });

    function renderFamilyList() {
      familyListDiv.innerHTML = "";
      familyData.forEach((diterima, index) => {
        const diterimaItem = document.createElement("div");
        diterimaItem.classList.add(
          "family-item",
          "flex",
          "bg-transparent",
          "m-4"
        );

        const familyImage = document.createElement("img");
        familyImage.src = family.fotoURL || "";
        familyImage.alt = "Profile Family";
        familyImage.classList.add(
          "profile-family",
          "w-10",
          "h-10",
          "rounded-full",
          "mr-2"
        );

        const familyInfo = document.createElement("div");
        familyInfo.classList.add("flex", "flex-col");

        const familyName = document.createElement("a");
        familyName.textContent = family.nama;
        familyName.classList.add(
          "nama-family",
          "font-montserrat",
          "font-bold",
          "text-[15px]"
        );

        const dateInput = family.tanggalLahir;
        const dateObject = new Date(dateInput);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = dateObject.toLocaleDateString("id-ID", options);

        const familyLahir = document.createElement("a");
        familyLahir.textContent = formattedDate;
        familyLahir.classList.add(
          "lahir-family",
          "font-montserrat",
          "font-medium",
          "text-[10px]"
        );

        familyInfo.appendChild(familyName);
        familyInfo.appendChild(familyLahir);

        diterimaItem.appendChild(familyImage);
        diterimaItem.appendChild(familyInfo);

        familyListDiv.appendChild(diterimaItem);
      });
    }

    // Save family data and update the family list
    simpanFamilyBtn.addEventListener("click", async function (event) {
      event.preventDefault();

      const nama = inputNama.value;
      const tanggalLahir = inputLahir.value;
      let fotoURL = "";
      // If a photo is uploaded, create a URL for it
      if (inputFoto.files && inputFoto.files[0] && nama && tanggalLahir) {
        const reader = new FileReader();
        reader.onload = function (e) {
          fotoURL = e.target.result;

          // Add the new family data to the array
          familyData.push({
            nama: nama,
            tanggalLahir: tanggalLahir,
            fotoURL: fotoURL,
          });

          // Re-render the family list
          renderFamilyList();

          // Clear the input fields
          inputNama.value = "";
          inputLahir.value = "";
          inputFoto.value = "";

          // Hide the "Tambah Family" page after saving
          tambahFamilyPage.classList.add("hidden");
        };

        reader.readAsDataURL(inputFoto.files[0]);
      }
      // else {
      //     // If no image, still add the family data without a photo
      //     familyData.push({
      //     nama: nama,
      //     tanggalLahir: tanggalLahir,
      //     fotoURL: ''
      //     });

      //     // Re-render the family list
      //     renderFamilyList();

      //     // Clear the input fields
      //     inputNama.value = '';
      //     inputLahir.value = '';
      //     inputFoto.value = '';

      //     // Hide the "Tambah Family" page after saving
      //     tambahFamilyPage.classList.add('hidden');
      // }
    });

    //ini untuk donate
    // let riwayatDiterimaData = [];

    // // Get DOM elements
    // const tambahDiterimaDonaturPage = document.getElementById('tambahDiterimaDonatur-page');
    // const diterimaTambahBtn = document.getElementById('diterimaTambah-btn');
    // const closeTambahDiterimaDonaturBtn = document.getElementById('closeTambahDiterimaDonatur-btn');
    // const simpanFamilyRiwayatDiterima = document.getElementById('simpan-familyRiwayatDiterima');
    // const inputNamaRiwayatDiterima = document.getElementById('input-namaRiwayatDiterima');
    // const inputLahirRiwayatDiterima = document.getElementById('input-lahirRiwayatDiterima');
    // const inputFotoRiwayatDiterima = document.getElementById('input-fotoRiwayatDiterima');
    // const diterimaList = document.getElementById('diterima-list');

    // // Show the "Tambah Family" page
    // diterimaTambahBtn.addEventListener('click', function() {
    //     tambahDiterimaDonaturPage.classList.remove('hidden');
    // });

    // // Close the "Tambah Family" page
    // closeTambahDiterimaDonaturBtn.addEventListener('click', function() {
    //     diterimaTambahBtn.classList.add('hidden');
    // });

    // // Function to display the family list
    // // Function to display the family list

    // document.getElementById('input-lahirRiwayatDiterima').addEventListener('change', function() {
    //     const dateInputB = this.value;
    //     const dateObjectB = new Date(dateInputB);
    //     const optionsB = { year: 'numeric', month: 'long', day: 'numeric' };
    //     const formattedDateB = dateObject.toLocaleDateString('id-ID', optionsB); // 'id-ID' for Indonesian locale

    //     // Display the formatted date
    //     document.getElementById('formattedDateB').textContent = formattedDateB;

    //     // Update the input field with formatted date
    //     this.type = 'text';
    //     this.value = formattedDateB;
    // });

    // function renderDiterimaList() {
    // familyListDiv.innerHTML = '';
    // riwayatDiterimaData.forEach((family, index) => {
    //     const familyItem = document.createElement('div');
    //     familyItem.classList.add('diterima-item', 'flex', 'bg-transparent', 'm-4');

    //     const familyImage = document.createElement('img');
    //     familyImage.src = family.fotoURL || '';
    //     familyImage.alt = 'Profile Family';
    //     familyImage.classList.add('profile-family', 'w-10', 'h-10', 'rounded-full', 'mr-2');

    //     const familyInfo = document.createElement('div');
    //     familyInfo.classList.add('flex', 'flex-col');

    //     const familyName = document.createElement('a');
    //     familyName.textContent = family.nama;
    //     familyName.classList.add('nama-family', 'font-montserrat', 'font-bold', 'text-[15px]');

    //     const dateInput = family.tanggalLahir;
    //     const dateObject = new Date(dateInput);
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     const formattedDate = dateObject.toLocaleDateString('id-ID', options);

    //     const familyLahir = document.createElement('a');
    //     familyLahir.textContent = formattedDate;
    //     familyLahir.classList.add('lahir-family', 'font-montserrat', 'font-medium', 'text-[10px]');

    //     familyInfo.appendChild(familyName);
    //     familyInfo.appendChild(familyLahir);

    //     familyItem.appendChild(familyImage);
    //     familyItem.appendChild(familyInfo);

    //     familyListDiv.appendChild(familyItem);
    // });
    // }

    //     // Save family data and update the family list
    // simpanFamilyBtn.addEventListener('click', function(event) {
    //     event.preventDefault();

    //     const nama = inputNama.value;
    //     const tanggalLahir = inputLahir.value;
    //     let fotoURL = '';

    //     // If a photo is uploaded, create a URL for it
    //     if (inputFoto.files && inputFoto.files[0]&&nama&&tanggalLahir) {
    //         const reader = new FileReader();
    //         reader.onload = function(e) {
    //         fotoURL = e.target.result;

    //         // Add the new family data to the array
    //         riwayatDiterimaData.push({
    //             nama: nama,
    //             tanggalLahir: tanggalLahir,
    //             fotoURL: fotoURL
    //         });

    //         // Re-render the family list
    //         renderDiterimaList();

    //         // Clear the input fields
    //         inputNama.value = '';
    //         inputLahir.value = '';
    //         inputFoto.value = '';

    //         // Hide the "Tambah Family" page after saving
    //         tambahFamilyPage.classList.add('hidden');
    //         };

    //         reader.readAsDataURL(inputFoto.files[0]);
    //     }
    //     // else {
    //     //     // If no image, still add the family data without a photo
    //     //     riwayatDiterimaData.push({
    //     //     nama: nama,
    //     //     tanggalLahir: tanggalLahir,
    //     //     fotoURL: ''
    //     //     });

    //     //     // Re-render the family list
    //     //     renderFamilyList();

    //     //     // Clear the input fields
    //     //     inputNama.value = '';
    //     //     inputLahir.value = '';
    //     //     inputFoto.value = '';

    //     //     // Hide the "Tambah Family" page after saving
    //     //     tambahFamilyPage.classList.add('hidden');
    //     // }
    // });

    //navbar profile
    document
      .getElementById("showMyProfile-btn")
      .addEventListener("click", function () {
        document.getElementById("myProfile-page").classList.remove("hidden");
        document.getElementById("donors-page").classList.add("hidden");
      });
    document
      .getElementById("showDonors-btn")
      .addEventListener("click", function () {
        document.getElementById("donors-page").classList.remove("hidden");
        document.getElementById("myProfile-page").classList.add("hidden");
      });
    document
      .getElementById("showChangePass-btn")
      .addEventListener("click", function () {
        document.getElementById("changePass-page").classList.remove("hidden");
      });
    document
      .getElementById("logOutShowt-btn")
      .addEventListener("click", function () {
        document.getElementById("logout-page").classList.remove("hidden");
      });
    document
      .getElementById("closeLogout-btn")
      .addEventListener("click", function () {
        document.getElementById("logout-page").classList.add("hidden");
      });
    document
      .getElementById("closeChange-btn")
      .addEventListener("click", function () {
        document.getElementById("changePass-page").classList.add("hidden");
      });

    document
      .getElementById("ubahData-btn")
      .addEventListener("click", function () {
        //document.getElementById('ubahData-page').classList.remove('hidden');
        // document.getElementById('donors-page').classList.add('hidden');
        // document.getElementById('myProfile-page').classList.add('hidden');
      });

    document
      .getElementById("close-edit-btn")
      .addEventListener("click", function () {
        //document.getElementById('ubahData-page').classList.add('hidden');
        document.getElementById("myProfile-page").classList.remove("hidden");
      });

    //slide btn
    // Define and attach toggleButtonText function after content is loaded

    // document.getElementById('join-btn').addEventListener('click', function() {
    //     const slider = document.getElementById('slider');
    //     const check = document.getElementById('check');

    //     document.getElementById('joining-page').classList.add('hidden');
    //     check.checked = true;
    //     slider.classList.add('bg-primary');
    //     slider.classList.remove('bg-secondary');
    //     slider.style.left = '70px';
    // });

    document
      .getElementById("joinClose-btn")
      .addEventListener("click", function () {
        const slider = document.getElementById("slider");
        const check = document.getElementById("check");

        document.getElementById("joining-page").classList.add("hidden");
        check.checked = false;
        slider.classList.remove("bg-primary");
        slider.classList.add("bg-secondary");
        slider.style.left = "0";
      });

    // document.getElementById('check').addEventListener('click', function() {
    //     const slider = document.getElementById('slider');
    //     const joiningPage = document.getElementById('joining-page');
    //     const check = document.getElementById('check');

    //     if (slider.classList.contains('bg-secondary')) {
    //         joiningPage.classList.remove('hidden');
    //         check.checked = true;

    //     } else if (slider.classList.contains('bg-primary')) {
    //         const userResponse = confirm('Halo Ibu hebat, terima kasih karna telah mau berbagi ASI \n Apakah ibu yakin untuk berhenti berbagi?');
    //         if (userResponse) {
    //             check.checked = false;
    //             slider.classList.remove('bg-primary');
    //             slider.classList.add('bg-secondary');
    //             slider.style.left = '0';
    //         }
    //     }
    // });

    document
      .getElementById("join-btn")
      .addEventListener("click", function requestLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };

              // Menyimpan data ke dalam JSON dengan lokasi
              const data = {
                bank: document.getElementById("bank-insert").value,
                noRek: document.getElementById("noRek-insert").value,
                riwayat: document.getElementById("riwayat-insert").value,
                phone: document.getElementById("phone-insert").value,
                desc: document.getElementById("desc-insert").value,
                surat: document.getElementById("surat-insert").value,
                lokasiTerkini: locationData,
              };

              //console.log(JSON.stringify(data)); // Data JSON yang mencakup lokasi

              // Simpan ke localStorage
              localStorage.setItem("userData", JSON.stringify(data));
              console.log(
                "Data tersimpan di localStorage:",
                JSON.stringify(data)
              );

              const slider = document.getElementById("slider");
              const check = document.getElementById("check");

              document.getElementById("joining-page").classList.add("hidden");
              check.checked = true;
              slider.classList.add("bg-primary");
              slider.classList.remove("bg-secondary");
              slider.style.left = "70px";
            },
            function (error) {
              const userResponse = alert(
                "Terima lokasi agar ASImu bisa tersalurkan kepada orang terdekat.\n Jika sebelumnya kamu sudah tidak menerima lokasi, hapus izin situs dan ulangi lagi"
              );
              if (userResponse) {
                // Re-request location access
                navigator.geolocation.getCurrentPosition(
                  function (position) {
                    const locationData = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    };

                    // Menyimpan data ke dalam JSON dengan lokasi
                    const data = {
                      bank: document.getElementById("bank-insert").value,
                      noRek: document.getElementById("noRek-insert").value,
                      riwayat: document.getElementById("riwayat-insert").value,
                      phone: document.getElementById("phone-insert").value,
                      desc: document.getElementById("desc-insert").value,
                      surat: document.getElementById("surat-insert").value,
                      lokasiTerkini: locationData,
                    };

                    //console.log(JSON.stringify(data)); // Data JSON yang mencakup lokasi
                    // Simpan ke localStorage
                    localStorage.setItem("userData", JSON.stringify(data));
                    console.log(
                      "Data tersimpan di localStorage:",
                      JSON.stringify(data)
                    );

                    const slider = document.getElementById("slider");
                    const check = document.getElementById("check");

                    document
                      .getElementById("joining-page")
                      .classList.add("hidden");
                    check.checked = true;
                    slider.classList.add("bg-primary");
                    slider.classList.remove("bg-secondary");
                    slider.style.left = "70px";
                  },
                  function (error) {
                    alert("Tidak dapat mengakses lokasi: " + error.message / n);
                    requestLocation(); // Re-prompt for location access
                  }
                );
              }
            }
          );
        } else {
          alert("Geolocation tidak didukung oleh browser ini.");
        }
      });

    document.getElementById("check").addEventListener("click", function () {
      const slider = document.getElementById("slider");
      const joiningPage = document.getElementById("joining-page");
      const check = document.getElementById("check");

      if (slider.classList.contains("bg-secondary")) {
        joiningPage.classList.remove("hidden");
        check.checked = true;
      } else if (slider.classList.contains("bg-primary")) {
        const userResponse = confirm(
          "Halo Ibu hebat, terima kasih karna telah mau berbagi ASI \n Apakah ibu yakin untuk berhenti berbagi?"
        );
        if (userResponse) {
          check.checked = false;
          slider.classList.remove("bg-primary");
          slider.classList.add("bg-secondary");
          slider.style.left = "0";
        }
      }
    });

    document
      .getElementById("setujuJoin-btn")
      .addEventListener("click", function () {
        const svgElement = this;
        const isPrimary =
          svgElement.getAttribute("fill") === "rgb(229, 229, 229)";

        if (isPrimary) {
          svgElement.setAttribute("fill", "rgb(200, 107, 133)"); // Warna primary
        } else {
          svgElement.setAttribute("fill", "rgb(229, 229, 229)"); // Warna gray-200
        }

        checkInputs(); // Re-check inputs when setujuJoin-btn is clicked
      });

    // Fungsi untuk mengunduh data dari localStorage
    document
      .getElementById("download-data-btn")
      .addEventListener("click", function () {
        const data = localStorage.getItem("userData");
        if (data) {
          const blob = new Blob([data], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "userData.json";
          a.click();
          URL.revokeObjectURL(url);
        } else {
          alert("Tidak ada data untuk diunduh.");
        }
      });
    function checkInputs() {
      const bank = document.getElementById("bank-insert").value;
      const noRek = document.getElementById("noRek-insert").value;
      const riwayat = document.getElementById("riwayat-insert").value;
      const phone = document.getElementById("phone-insert").value;
      const desc = document.getElementById("desc-insert").value;
      const surat = document.getElementById("surat-insert").value;

      const joinBtn = document.getElementById("join-btn");
      const setujuJoinBtn = document.getElementById("setujuJoin-btn");

      if (
        bank &&
        noRek &&
        riwayat &&
        phone &&
        desc &&
        surat &&
        setujuJoinBtn.getAttribute("fill") === "rgb(200, 107, 133)"
      ) {
        joinBtn.disabled = false;
        joinBtn.classList.add("bg-primary");
      } else {
        joinBtn.disabled = true;
        joinBtn.classList.remove("bg-primary");
      }
    }

    // Add event listeners to inputs
    document
      .getElementById("bank-insert")
      .addEventListener("input", checkInputs);
    document
      .getElementById("noRek-insert")
      .addEventListener("input", checkInputs);
    document
      .getElementById("riwayat-insert")
      .addEventListener("input", checkInputs);
    document
      .getElementById("phone-insert")
      .addEventListener("input", checkInputs);
    document
      .getElementById("desc-insert")
      .addEventListener("input", checkInputs);
    document
      .getElementById("surat-insert")
      .addEventListener("input", checkInputs);

    // Initial check
    checkInputs();

    //untuk page join donatur masih error eror
    // Add event listener to the SVG button after the content is loaded
    // document.getElementById('setujuJoin-btn').addEventListener('click', function() {
    //     const svgElement = this;
    //     const isPrimary = svgElement.getAttribute('fill') === 'rgb(229, 229, 229)';

    //     if (isPrimary) {
    //         svgElement.setAttribute('fill', 'rgb(200, 107, 133)'); // Warna primary
    //     } else {
    //         svgElement.setAttribute('fill', 'rgb(229, 229, 229)'); // Warna gray-200
    //     }
    // });

    // const joiningPage = document.getElementById("joining-page");
    // const joinBtn = document.getElementById("join-btn");

    // function isElementVisible(element) {

    //     return element && element.offsetParent !== null;
    // }

    // function initializeJoinButton() {

    //     if (isElementVisible(joiningPage) && joinBtn) {
    //         document.getElementById('setujuJoin-btn').addEventListener('click', function() {
    //             const svgElement = this;
    //             const isPrimary = svgElement.getAttribute('fill') === 'rgb(229, 229, 229)';

    //             if (isPrimary) {
    //                 svgElement.setAttribute('fill', 'rgb(200, 107, 133)'); // Warna primary
    //             } else {
    //                 svgElement.setAttribute('fill', 'rgb(229, 229, 229)'); // Warna gray-200
    //             }
    //         });

    //         // Add event listener for join button
    //         joinBtn.addEventListener("click", function(event) {
    //             event.preventDefault(); // Prevent default form submission

    //             // Get values from each input
    // const bank = document.getElementById("bank-insert").value;
    // const noRek = document.getElementById("noRek-insert").value;
    // const riwayat = document.getElementById("riwayat-insert").value;
    // const phone = document.getElementById("phone-insert").value;
    // const desc = document.getElementById("desc-insert").value;

    //             // Convert to JSON
    //             const formData = {
    //                 bank: bank,
    //                 noRek: noRek,
    //                 riwayat: riwayat,
    //                 phone: phone,
    //                 desc: desc,
    //             };

    //             // Display JSON in console or save data as needed
    //             console.log(JSON.stringify(formData));

    //             // You can save data in localStorage or send it to the server
    //             // localStorage.setItem("formData", JSON.stringify(formData));
    //         });
    //     }
    // }

    // // Check visibility and initialize join button
    // if (isElementVisible(joiningPage)) {
    //     initializeJoinButton();
    // }

    // // Optionally, you can re-check visibility when the checkbox changes
    // document.getElementById("check").addEventListener("change", function() {
    //     if (isElementVisible(joiningPage)) {
    //         initializeJoinButton();
    //     }
    // });
  });

let donors
//bagasi page
// Memuat konten bagasi.html dan render layout profil donatur
fetch("bagasi.html")
  .then((response) => response.text())
  .then((bagasiContent) => {
    document.getElementById("bagasi-content").innerHTML = bagasiContent;

    // Memeriksa apakah browser mendukung Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log("Geolocation tidak didukung oleh browser ini.");
    }

    // Fungsi callback jika berhasil mendapatkan lokasi
    async function successCallback(position) {
      const latitude = position.coords.latitude;
      const longtitude = position.coords.longitude;

      const respon = await fetch(
        `/findNearestUnggahan?lat=${latitude}&lng=${longtitude}&lim=5`
      );
       ({ payload: { datas: donors }} = await respon.json());
      const donorListProfile = document.getElementById("donor-list");
      console.log(donors)
      for (const donor of donors) {
        donorListProfile.innerHTML += renderDonor(donor)
      }
    }

    // Fungsi callback jika gagal mendapatkan lokasi
    function errorCallback(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Pengguna menolak permintaan Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Informasi lokasi tidak tersedia.");
          break;
        case error.TIMEOUT:
          console.log(
            "Permintaan untuk mendapatkan lokasi melebihi batas waktu."
          );
          break;
        case error.UNKNOWN_ERROR:
          console.log("Terjadi kesalahan yang tidak diketahui.");
          break;
      }
    }

    function renderDonor(donor, index) {
      return `
            <div class="flex flex-col sm:flex-row outline outline-gray-400 rounded-xl p-4 m-3 bg-white">
                <img src="image/${donor.userid}" class="sm:w-[180px] sm:h-[180px] rounded-xl">
                <ul class="flex flex-col sm:h-[150px] sm:mx-5">
                    <li class="flex justify-between">
                        <a href="#" class="font-montserrat font-bold text-[17px]">${donor.nama}</a>
                        <a href="#" class="flex flex-row items-center text-black font-montserrat font-light text-[12px]">
                            <img src="image/lokasi-vector.svg" class="w-[10px]">${donor.distance_in_meters}Meters
                        </a>
                    </li>
                    <li class="font-montserrat font-light text-[12px] mt-0">${donor.tanggal_lahir}</li>
                    <li class="font-montserrat font-medium line-clamp-3 text-[12px] mt-2">${donor.keterangan}</li>
                    <li class="sm:mt-auto">
                        <button id="checkDonaturProfile-btn-${donor.userid}" onclick="donorListener('${donor.userid}')" class="whitespace-nowrap rounded-full bg-primary text-white font-montserrat font-medium px-3 mt-2" data-index="${index}">Check Profile</button>
                    </li>
                </ul>
            </div>`;
    }
  })
  .catch((error) => console.error("Error loading bagasi.html:", error));

  function renderProfileDonor(donor) {
    return `
          <div class="flex flex-row items-center justify-evenly">
                  <div class="flex flex-col outline outline-gray-300 bg-white rounded-xl py-3 w-[65%] ps-[5%] min-h-[650px]">
                      <div class="flex justify-between" >
                          <div class="flex justify-start">
                              <a id="toDonorList-btn" class="justify-start text-[100%] p-[3%] font-montserrat font-bold"> x</a>
                              <img id="" class=" w-[200px] h-[200px] rounded-lg" src="image/${donor.userid}" alt="">
                              <ul class=" m-3 ">
                                  <li class="max-w-[200px] flex flex-col overflow-hidden max-h-[50px] "> 
                                        <span class="font-semibold text-md">Nama</span>
                                      <a href="#" id="name_donor" class="font-montserrat font-semibold text-[17px]" >${donor.nama}</a> 
                                  </li>
                                  <li>
                                      <a href="#" id="lahir_donor" class="font-montserrat font-light text-[15px]">${new Date(donor.tanggal_lahir).toLocaleDateString("id-ID")} </a>
                                  </li>
                                  <li>
                                      <a href="#"  class="font-montserrat font-semibold text-[15px]">Donations </a>
                                  </li>
                                  <li class="flex">
                                      <img src="/srcimage/total_donation.svg" alt="">
                                      <a href="" id="total_donor">5</a>
                                  </li>
                                  <li>
                                      <a href="#" class="font-montserrat font-semibold text-[15px]">Child </a>
                                  </li>
                                  <li class="flex">
                                      <img src="/srcimage/total_family.svg" alt="">
                                      <a href="" id="total_family_donor">3</a>
                                  </li>
                              </ul>
                          </div>
                          
                              
                          <div class=" flex flex-col justify-end items-center">
                              <a class=" font-semibold text-[17px]">Surat Keterangan Sehat</a>
                              <a id="unduh-donatur" class="bg-primary rounded-xl font-medium text-center text-white text-[15px] px-[5px]">Download</a>
                          </div>
  
                          <ul class="flex flex-col w-[40px] h-[120px] items-center justify-center bg-gray-100 rounded-xl">
                              <li class="p-[3px] "><img src="image/like-btn.svg" alt="" class="w-[30px]"></li>
                              <li class="p-[3px]" ><img src="image/share-btn.svg" alt="" class="w-[30px]"></li>
                              <li class="p-[3px]"><svg width="30" height="30" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M0 7.40278C0 3.31433 3.31433 0 7.40278 0H33.5972C37.6856 0 41 3.31433 41 7.40278V33.5972C41 37.6856 37.6856 41 33.5972 41H7.40278C3.31433 41 0 37.6856 0 33.5972V7.40278ZM22.2083 10.8194C22.2083 9.87597 21.4435 9.11111 20.5 9.11111C19.5565 9.11111 18.7917 9.87597 18.7917 10.8194V18.7917H10.8194C9.87597 18.7917 9.11111 19.5565 9.11111 20.5C9.11111 21.4435 9.87597 22.2083 10.8194 22.2083H18.7917V30.1806C18.7917 31.124 19.5565 31.8889 20.5 31.8889C21.4435 31.8889 22.2083 31.124 22.2083 30.1806V22.2083H30.1806C31.124 22.2083 31.8889 21.4435 31.8889 20.5C31.8889 19.5565 31.124 18.7917 30.1806 18.7917H22.2083V10.8194Z" fill="#9CA3AF"/>
                                  </svg>
                                  
                              </li>
                          </ul>
                          
                          
                      </div>

                      <div class="flex flex-col my-3 me-3">
                          <a class="font-bold text-[20px]"> About</a>
                          <p class="font-normal text-[15px]">${donor.keterangan}</p>
                      </div>
                      
                      <div class="flex flex-col  my-3 me-3">
                          <a class="font-bold text-[20px]"> Medical Check</a>
                          <p class="font-normal text-[15px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt rem velit incidunt nesciunt quasi ad nihil officiis fugit sed odit! Nesciunt repellendus aliquam itaque. Unde officiis debitis nisi quis odio! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, magni! Autem iure fugit aut, inventore qui laudantium eligendi maxime. Numquam animi suscipit optio enim odit omnis necessitatibus. Quaerat, rem veniam.</p>
                      </div>

                      <div class="flex flex-col my-3 me-3">
                          <a class="font-bold text-[20px]"> Address</a>
                          <p class="font-normal text-[15px]">${donor.alamat}</p>
                      </div>
                      <div class="flex flex-col  my-3 me-3">
                          <a class="font-bold text-[20px]"> Contact</a>
                          <a href="https://wa.me/${donor.no_hp || '6289518418703'}">click to chat</a>
                      </div>
  
                  </div>

                  <!-- bagasi dan child list-->

                  <div  class="flex flex-col justify-between w-[20%] min-h-[650px]">
                      <div id="bagasid-section" class="outline outline-gray-300 bg-white rounded-md overflow-y-auto h-[350px] no-scrollbar">
                          <a class="font-montserrat font-bold text-[20px] m-[20px]">
                              Donated
                          </a>

                          

                          <div class="bagasid-item flex bg-transparent m-4"> 
                              <img src="photo_url_here" alt="Profile Family" class="profile-family w-10 h-10 rounded-full mr-2"> 
                              <div class="flex flex-col"> 
                                  <a class="nama-family font-montserrat font-bold text-[15px]">Nama Family</a> 
                                  <a class="lahir-family font-montserrat font-medium text-[10px]">Tanggal Lahir</a> 
                              </div>
  
                          </div>
                      </div>

                      <div id="child-section" class="outline outline-gray-300 bg-white rounded-md mt-3 overflow-y-auto h-[250px] no-scrollbar">
                          <a class="font-montserrat font-bold text-[20px] m-[20px]">
                              Child
                          </a>

                          <div class="child-item flex bg-transparent m-4"> 
                              <img src="photo_url_here" alt="Profile Family" class="profile-family w-10 h-10 rounded-full mr-2"> 
                              <div class="flex flex-col"> 
                                  <a class="nama-family font-montserrat font-bold text-[15px]">Nama Family</a> 
                                  <a class="lahir-family font-montserrat font-medium text-[10px]">Tanggal Lahir</a> 
                              </div>
                          </div>
  
                      </div>


                  </div>

              
              </div>`;
  }



  function donorListener(id) {
    console.log(id)
    const donor = donors.find(d => d.userid = id)
    console.log(donor)
    const donorProfileSection = document.getElementById("pageDonaturProfile");
    donorProfileSection.innerHTML = renderProfileDonor(donor);
    donorProfileSection.classList.remove("hidden");
    document.getElementById("donatur-page").classList.add("hidden"); // Hide other sections if needed
    document.getElementById("becomeDonatur-page").classList.add("hidden");

    // Tambahkan event listener setelah profil donor ditampilkan
    document
      .getElementById("toDonorList-btn")
      .addEventListener("click", () => {
        donorProfileSection.classList.add("hidden");
        document
          .getElementById("donatur-page")
          .classList.remove("hidden");
        document
          .getElementById("becomeDonatur-page")
          .classList.remove("hidden");
      });
  }
// // Menangani klik pada tombol profil
// document.getElementById('profile-btn').addEventListener('click', function (event) {
//     const dropdown = document.getElementById('profile-dropdown');

//     // Toggle dropdown hanya jika tombol profil diklik
//     dropdown.classList.toggle('hidden');

//     // Mencegah event click ini juga dianggap sebagai click di luar dropdown
//     event.stopPropagation();
// });

// Menutup dropdown jika pengguna mengklik di luar area dropdown
// document.addEventListener('click', function (event) {
//     const dropdown = document.getElementById('profile-dropdown');
//     const isClickInsideDropdown = dropdown.contains(event.target); // Mengecek jika klik terjadi di dalam dropdown

//     // Jika klik terjadi di luar dropdown, sembunyikan dropdown
//     if (!isClickInsideDropdown) {
//         dropdown.classList.add('hidden'); // Tambahkan class 'hidden' untuk menyembunyikan dropdown
//     }
//     });

// // Menangani klik pada tombol goto-profile-btn untuk mengubah isi profil
// document.getElementById("goto-profile-btn").addEventListener("click", function() {
//     document.getElementById("profile-page").classList.remove("hidden");
// });

//mobile view
// document.getElementById('hamburger-btn').addEventListener('click', function () {
//     const nav = document.getElementById('mobile-nav');
//    nav.classList.toggle('hidden'); // Toggle untuk menampilkan atau menyembunyikan menu navigasi
// });

//menyatukan tapi gaada data
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const locationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    // Fetch form data
    const formData = {
      email: document.querySelector("input[type='email']").value,
      password: document.querySelector("input[type='password']").value,
    };

    // Combine form data with location data
    const data = {
      bank: document.getElementById("bank-insert").value,
      noRek: document.getElementById("noRek-insert").value,
      riwayat: document.getElementById("riwayat-insert").value,
      phone: document.getElementById("phone-insert").value,
      desc: document.getElementById("desc-insert").value,
      surat: document.getElementById("surat-insert").value,
      lokasiTerkini: locationData,
      email: formData.email,
      password: formData.password,
    };

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(data));
    console.log("Data tersimpan di localStorage:", JSON.stringify(data));

    const slider = document.getElementById("slider");
    const check = document.getElementById("check");

    document.getElementById("joining-page").classList.add("hidden");
    check.checked = true;
    slider.classList.add("bg-primary");
    slider.classList.remove("bg-secondary");
    slider.style.left = "70px";
  });
}

//about page
fetch("about.html")
  .then((response) => response.text())
  .then((aboutContent) => {
    document.getElementById("about-content").innerHTML = aboutContent;
  });

//contact page
fetch("contact.html")
  .then((response) => response.text())
  .then((contactContent) => {
    document.getElementById("contact-content").innerHTML = contactContent;
  });

//donate page
fetch("donate.html")
  .then((response) => response.text())
  .then((contactContent) => {
    document.getElementById("donate-content").innerHTML = contactContent;
  });

//artikel page
//artikel page
fetch("artikel.html")
  .then((response) => response.text())
  .then((contactContent) => {
    document.getElementById("artikel-content").innerHTML = contactContent;
    document.getElementById("btn-a1").addEventListener("click", function () {
      document.getElementById("pageArtikel").classList.add("hidden");
      document.getElementById("1page-artikel").classList.remove("hidden");
    });

    document
      .getElementById("close-1pageArtikel")
      .addEventListener("click", function () {
        document.getElementById("1page-artikel").classList.add("hidden");
        document.getElementById("pageArtikel").classList.remove("hidden");
      });
  });

//Backend Area
const registerClick = async (event) => {
  event.preventDefault();
  const nama = document.getElementById("nama-register").value;
  const alamat = document.getElementById("alamat-register").value;
  const email = document.getElementById("email-register").value;
  const password = document.getElementById("password-register").value;
  const tanggal_lahir = document.getElementById("tanggal-register").value;
  const response = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, nama, alamat, tanggal_lahir }),
  });
  const res = await response.json();
  if (res.message) {
    console.log(res);
  } else {
    console.log("eror bang  " + res.error);
  }
};

const loginClick = async () => {
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;
  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const res = await response.json();
};

const updateProfilClick = async () => {
  const nama = document.getElementById("nama-field").value;
  const email = document.getElementById("email-field").value;
  const alamat = document.getElementById("alamat-field").value;
  const tanggalLahir = document.getElementById("tanggalLahir-field").value;
  const noWa = document.getElementById("nohp-field").value;
  const bank = document.getElementById("bank-field").value;
  const noRek = document.getElementById("noRekening-field").value;
  const deskripsiDiri = document.getElementById("deskripsiDiri-field").value;
  try {
    const response = await fetch("/userUpdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        email,
        alamat,
        tanggalLahir,
        noWa,
        bank,
        noRek,
        deskripsiDiri,
      }),
    });
    const res = await response.json();
    if (response.ok) {
      document.getElementById("nama-field").value = "";
      document.getElementById("email-field").value = "";
      document.getElementById("alamat-field").value = "";
      document.getElementById("tanggalLahir-field").value = "";
      document.getElementById("nohp-field").value = "";
      document.getElementById("bank-field").value = "";
      document.getElementById("noRekening-field").value = "";
      document.getElementById("deskripsiDiri-field").value = "";
    }
  } catch (error) {
    console.log(error);
  }
};

async function handleActive(el) {
    const active = el.checked
    const res = await fetch("/isActive?act=" + (active ? 1 : 0), {
        method: "POST"
    })
    console.log(await res.text())
}

async function logout() {
    await fetch("/logout")
    document.getElementById("logout-page").classList.add("hidden")
}

async function tambahfamily() {
  /** @type {HTMLInputElement} */
  const nama = document.getElementById("input-nama-family")
  /** @type {HTMLInputElement} */
  const lahir = document.getElementById("input-lahir-family")
  /** @type {HTMLInputElement} */
  const pict = document.getElementById("input-foto-family")

  // const fd = new FormData()
  // fd.set("avatar", pict.files[0])
  // const { filename } = await fetch("/profilepict", {
  //   method: "POST",
  //   body: fd,
  //   credentials: "include"
  // })
  //   .then(res => res.json())
  console.log({
    nama: nama.value,
    tanggal_lahir: lahir.value
  })
  const anak = await fetch("/userChildren", {
    method: "POST",
    body: JSON.stringify({
      nama: nama.value,
      tanggal_lahir: lahir.value
    }),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
}

// By default, show the home section
hideAllSections();
showSection("#home");

