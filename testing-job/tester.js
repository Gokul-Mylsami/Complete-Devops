const getDataBakend = async (i) => {
  const response = await fetch(
    "http://backend-service.default:8000/api/v1/flights"
  );
  const data = await response.json();
  console.log(i + data.status);
};

for (let i = 0; i < 4000; i++) {
  getDataBakend(i);
}
