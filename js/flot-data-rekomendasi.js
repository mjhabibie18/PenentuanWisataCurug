function getRekomendasi(){
    //ngambil data rata" dari tiap sensor
    var tmpPrediksiciga1 = document.getElementById('avgNciga1').innerHTML
	var tmpPrediksiciga2 = document.getElementById('avgNciga2').innerHTML
    var tmpPrediksiciga3 = document.getElementById('avgNciga3').innerHTML

    var tmpPrediksiciku1 = document.getElementById('avgNciku1').innerHTML
	var tmpPrediksiciku2 = document.getElementById('avgNciku2').innerHTML
    var tmpPrediksiciku3 = document.getElementById('avgNciku3').innerHTML
    
    var tmpPrediksiseri1 = document.getElementById('avgNseri1').innerHTML
	var tmpPrediksiseri2 = document.getElementById('avgNseri2').innerHTML
    var tmpPrediksiseri3 = document.getElementById('avgNseri3').innerHTML
    
    //ngambil data dari inputan bobot
    var tmpBobotciga1 = document.getElementById('bobotTempciga').value
    var tmpBobotciga2 = document.getElementById('bobotHumciga').value
    var tmpBobotciga3 = document.getElementById('bobotLdrciga').value

    var tmpBobotciku1 = document.getElementById('bobotTempciku').value
    var tmpBobotciku2 = document.getElementById('bobotHumciku').value
    var tmpBobotciku3 = document.getElementById('bobotLdrciku').value

    var tmpBobotseri1 = document.getElementById('bobotTempseri').value
    var tmpBobotseri2 = document.getElementById('bobotHumseri').value
    var tmpBobotseri3 = document.getElementById('bobotLdrseri').value

    //hasil data dari perkalian bobot dengan rata" dari tiap sensor
    var tmpHasilciga1 = parseFloat(tmpPrediksiciga1) * parseFloat(tmpBobotciga1)
    var tmpHasilciga2 = parseFloat(tmpPrediksiciga2) * parseFloat(tmpBobotciga2)
    var tmpHasilciga3 = parseFloat(tmpPrediksiciga3) * parseFloat(tmpBobotciga3)

    var tmpHasilciku1 = parseFloat(tmpPrediksiciku1) * parseFloat(tmpBobotciku1)
    var tmpHasilciku2 = parseFloat(tmpPrediksiciku2) * parseFloat(tmpBobotciku2)
    var tmpHasilciku3 = parseFloat(tmpPrediksiciku3) * parseFloat(tmpBobotciku3)
    console.log(tmpPrediksiciku3)

    var tmpHasilseri1 = parseFloat(tmpPrediksiseri1) * parseFloat(tmpBobotseri1)
    var tmpHasilseri2 = parseFloat(tmpPrediksiseri2) * parseFloat(tmpBobotseri2)
    var tmpHasilseri3 = parseFloat(tmpPrediksiseri3) * parseFloat(tmpBobotseri3)
    
    //total data
    var totalCiga = (parseFloat(tmpHasilciga1) + parseFloat(tmpHasilciga2) + parseFloat(tmpHasilciga3)) / 3;
    var totalCiku = (parseFloat(tmpHasilciku1) + parseFloat(tmpHasilciku2) + parseFloat(tmpHasilciku3)) / 3;
    var totalSeri = (parseFloat(tmpHasilseri1) + parseFloat(tmpHasilseri2) + parseFloat(tmpHasilseri3)) / 3;

    console.log(totalCiga,totalCiku,totalSeri)

    //hasil rekomendasi
    if (totalCiga < totalCiku && totalCiga < totalSeri) {
        var rekomen = "curug cigamea"
    }else if(totalCiku < totalCiga && totalCiku < totalSeri){
        var rekomen = "curug cikuluwung"
    }else{
        var rekomen = "curug seribu"
    }

        var table = document.getElementById("dataTables-example");
		var x = document.getElementById("dataTables-example").rows.length;
		var tableRef = document.getElementById('dataTables-example').getElementsByTagName('tbody')[0];

		//document.getElementById("dataTables-example").deleteRow(x-1);
		for(i=x; i>1; i--)
		{
			document.getElementById("dataTables-example").deleteRow(i-1);
		}
			var row = tableRef.insertRow(tableRef.rows.length);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = rekomen;


}