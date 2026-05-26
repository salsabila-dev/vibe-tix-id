
    // LOADING
    window.onload = function(){

      setTimeout(function(){

        document.getElementById("loading")
        .style.display = "none";

      },1500);

    }

    // BUY TICKET
    function buyTicket(){

      let notif =
      document.getElementById("notif");

      notif.style.display = "block";

      setTimeout(function(){

        notif.style.display = "none";

      },2000);

    }

    // CATEGORY ACTIVE
    let item =
    document.querySelectorAll(".item");

    item.forEach(function(data){

      data.addEventListener("click", function(){

        item.forEach(function(remove){

          remove.classList.remove("active");

        });

        this.classList.add("active");

      });

    });

    // SEARCH
    let searchBox =
    document.getElementById("searchBox");

    searchBox.addEventListener("keyup", function(){

      let keyword =
      searchBox.value.toLowerCase();

      let cards =
      document.querySelectorAll(".card");

      cards.forEach(function(card){

        let title =
        card.querySelector("h3")
        .innerHTML.toLowerCase();

        if(title.includes(keyword)){

          card.style.display = "block";

        }

        else{

          card.style.display = "none";

        }

      });

    });

    // DETAIL CONCERT
    function showDetail(
      title,
      location,
      date,
      guest,
      price
    ){

      document.getElementById("detailTitle")
      .innerHTML = title;

      document.getElementById("detailLocation")
      .innerHTML = "Lokasi : " + location;

      document.getElementById("detailDate")
      .innerHTML = "Tanggal : " + date;

      document.getElementById("detailGuest")
      .innerHTML = "Guest Star : " + guest;

      document.getElementById("detailPrice")
      .innerHTML = "Harga : " + price;

    }

    // COUNTDOWN
    let countdown;

    function setCountdown(){

      clearInterval(countdown);

      let inputDate =
      document.getElementById("concertDate").value;

      let concertDate =
      new Date(inputDate).getTime();

      countdown =
      setInterval(function(){

        let now =
        new Date().getTime();

        let distance =
        concertDate - now;

        let days =
        Math.floor(distance / (1000*60*60*24));

        let hours =
        Math.floor((distance % (1000*60*60*24))
        / (1000*60*60));

        let minutes =
        Math.floor((distance % (1000*60*60))
        / (1000*60));

        let seconds =
        Math.floor((distance % (1000*60))
        / 1000);

        document.getElementById("days")
        .innerHTML = days;

        document.getElementById("hours")
        .innerHTML = hours;

        document.getElementById("minutes")
        .innerHTML = minutes;

        document.getElementById("seconds")
        .innerHTML = seconds;

      },1000);

    }

    // DATABASE BOOKING
    let bookingForm =
    document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function(event){

      event.preventDefault();

      let name =
      document.getElementById("name").value;

      let email =
      document.getElementById("email").value;

      let ticket =
      document.getElementById("ticketType").value;

      let payment =
      document.getElementById("payment").value;

      let table =
      document.getElementById("dataTable");

      let row =
      table.insertRow();

      row.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${ticket}</td>
      <td>${payment}</td>
      `;

      alert("Booking berhasil 🎫");

      bookingForm.reset();

    });

