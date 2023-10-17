const form = document.getElementById('calculadora'); // id del formulario
const chart = document.getElementById('myChart'); // id del grafico
let myChart ; 

const obtenerDatosMoneda = async (moneda) => {
  try {
    const valores = await fetch(`https://mindicador.cl/api/${moneda}`); //
    const resultados = await valores.json(); //convierte todo a un objeto .jason
    console.log(resultados);
    return resultados.serie;
  } catch (error) {
    alert(error.message);
  }
};

obtenerDatosMoneda("euro");

const calcularTotaLMondes = (valor, datos) => {
  const valorMoneda = datos[0].valor;
  const total = valor / valorMoneda;
  return Math.round(total * 100) / 100;
};

mostrarTotalEnPantalla = (total) => {
  document.getElementById("total-valor").innerHTML = total;
};

const obtenerValores = (datos) => {
  return datos.map((item) => item.valor);
};

const obtenerFechas = (datos) => {
  return datos.map((item) => new Date(item.fecha).toLocaleDateString("en-US"));
};

const destreirGraficoAnterior = () => {
  if (myChart) {
    myChart.destroy();
  }
};

const calcularValorEnMonedas = async (valor, moneda) => {
  const datos = await obtenerDatosMoneda(moneda);
  mostrarGrafico(datos, valor);
};

const mostrarGrafico = (datos, valor) => {
  const total = calcularTotaLMondes(valor, datos);
  mostrarTotalEnPantalla(total);

  const labels = obtenerFechas(datos);
  const values = obtenerValores(datos);

  const datasets = [
    {
      label: "moneda",
      borderColor: " rbg(255, 99, 132)",
      data: values,
    },
  ];
  const config = {
    type: "line",
    data: { labels, datasets },
  };
  destreirGraficoAnterior();
  chart.style.backgroundColor = "black";
  chart.borderRadius = "10px";

  myChart = new_chart(chart, config);
};

form.addEventListener("submit", async (Event) => {
  Event.preventDefault();
  const valor = form.elements["valor"].value;
  const moneda = form.elements["moneda"].value;

  if (!valor) {
    alert("ingrese el valor");
    return;
  }

  if (!moneda) {
    alert("selecciona una moneda");
    return;
  }

  await calcularValorEnMonedas(valor, moneda);
 
});