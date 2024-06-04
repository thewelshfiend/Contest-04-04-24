// Importing Student data
let dataArray = JSON.parse(localStorage.getItem("data"));

// --------------------------------------------------------------------------

// DOM starts here
// loading table
const form = document.querySelector("form");
const tBody1 = document.getElementById("tbody1");
const table2 = document.getElementById("table2");

function loadTable1(arr)
{
    table2.style.cssText = "display:none;";

    tBody1.innerHTML = "";
    arr.forEach((data) => {
        const row1 = document.createElement("tr");
        row1.innerHTML = `
            <td style="text-align: center;">${data.id}</td>
            <td>
                <img src=${data.img_src} alt="${data.first_name} ${data.last_name}" class=me-1>
                <span>${data.first_name} ${data.last_name}</span>
            </td>
            <td>${data.gender}</td>
            <td>${data.class}</td>
            <td>${data.marks}</td>
            ${(data.passing == true) ? "<td class=text-success>Passed</td>" : "<td class=text-danger>Failed</td>"}
            <td><a href=mailto:${data.email}>${data.email}</a></td>
            `;
        tBody1.appendChild(row1);
    });
}
loadTable1(dataArray);

// Search functionality
const search_field = form.querySelector("input");
const search_btn = document.getElementById("search");

search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchValue = search_field.value;
    const filteredArray = dataArray.filter((data) => {
        return data.first_name.toLowerCase().includes(searchValue.toLowerCase()) || data.last_name.toLowerCase().includes(searchValue.toLowerCase()) || data.email.toLowerCase().includes(searchValue.toLowerCase());
    });
    search_field.value = "";
    loadTable1(filteredArray);
})

// Sort Full name A -> Z or Z -> A
const sort_asc = document.getElementById("sort-asc");
const sort_desc = document.getElementById("sort-desc");
sort_asc.addEventListener("click", sortAZ);
sort_desc.addEventListener("click", sortZA);

function sortAZ()
{
    const sortedArray = [...dataArray];
    sortedArray.sort((a, b) => {
        const [a_fullName, b_fullName] = [a.first_name + " " + a.last_name, b.first_name + " " + b.last_name];
        if (a_fullName < b_fullName)
        {
            return -1;
        }
        else if (a_fullName > b_fullName)
        {
            return 1;
        }
    });
    loadTable1(sortedArray);
}
function sortZA()
{
    const sortedArray = [...dataArray];
    sortedArray.sort((a, b) => {
        const [a_fullName, b_fullName] = [a.first_name + " " + a.last_name, b.first_name + " " + b.last_name];
        if (a_fullName > b_fullName)
        {
            return -1;
        }
        else if (a_fullName < b_fullName)
        {
            return 1;
        }
    });
    loadTable1(sortedArray);
}

// Sort By Marks
const sort_mark = document.getElementById("sort-mark");
sort_mark.addEventListener("click", sortMarks);

function sortMarks()
{
    const sortedArray = [...dataArray];
    sortedArray.sort((a, b) => {
        if (a.marks < b.marks)
        {
            return -1;
        }
        else if (a.marks > b.marks)
        {
            return 1;
        }
    });
    loadTable1(sortedArray);
}

// Show only Passing
const sort_pass = document.getElementById("sort-pass");
sort_pass.addEventListener("click", sortPass);

function sortPass()
{
    const passArray = dataArray.filter((data) => {
        return data.passing == true;
    });
    loadTable1(passArray);
}

// Sort By Class
const sort_class = document.getElementById("sort-class");
sort_class.addEventListener("click", sortClass);

function sortClass()
{
    const sortedArray = [...dataArray];
    sortedArray.sort((a, b) => {
        if (a.class < b.class)
        {
            return -1;
        }
        else if (a.class > b.class)
        {
            return 1;
        }
    });
    loadTable1(sortedArray);
}

// Sort by Gender
const sort_gender = document.getElementById("sort-gender");
sort_gender.addEventListener("click", sortGender);

function sortGender()
{
    const femaleArray = dataArray.filter((data) => {
        return data.gender == "Female";
    });
    loadTable1(femaleArray);
    const maleArray = dataArray.filter((data) => {
        return data.gender == "Male";
    });
    table2.style.cssText = "display:block;";
    loadTable2(maleArray);
}
function loadTable2(arr)
{
    const tBody2 = document.getElementById("tbody2");
    tBody2.innerHTML = "";
    arr.forEach((data) => {
        const row2 = document.createElement("tr");
        row2.innerHTML = `
            <td style="text-align: center;">${data.id}</td>
            <td>
                <img src=${data.img_src} alt="${data.first_name} ${data.last_name}" class=me-1>
                <span>${data.first_name} ${data.last_name}</span>
            </td>
            <td>${data.gender}</td>
            <td>${data.class}</td>
            <td>${data.marks}</td>
            ${(data.passing == true) ? "<td class=text-success>Passed</td>" : "<td class=text-danger>Failed</td>"}
            <td><a href=mailto:${data.email}>${data.email}</a></td>
            `;
        tBody2.appendChild(row2);
    });
}