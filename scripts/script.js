const searchInput = document.querySelector('#search-input');
const suggestionList = document.querySelector('.suggestion-list');

searchInput.addEventListener('input', event => {
  let text = event.target.value.trim().toLowerCase();
  // console.log(text);

  if(text.length) {
    fetchData(text);
  } else {
    suggestionList.innerHTML = '';
  }
})

const fetchData = async (text) => {
  const data = await fetch('http://dummy.restapiexample.com/api/v1/employees');
  data.json().then(res => {
    // console.log(res);
    let employeeList = res.data;
    // console.log(employeeList);

    let filteredList = employeeList.filter(employee => {
      return (employee.employee_name.toLowerCase().includes(text));
    })
    // console.log(filteredList);

    let html = '';
    filteredList.forEach(employee => {
      html += `
        <div class="list-item">                      
          <div><b>${employee.employee_name}</b></div>
          <span><b>Id:</b> ${employee.id}</span>
          <span><b>Age:</b> ${employee.employee_age}</span>
          <span><b>Salary:</b> ${employee.employee_salary}</span>
        </div>
      `
    })
    suggestionList.innerHTML = html;
  })
}