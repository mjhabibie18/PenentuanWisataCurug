//Flot Line Chart
$(document).ready(function() {
    console.log("document ready");

    document.getElementById("avgNciga2").style.display = "none";
    var offset = 0;
    getHum();
    function getHum()
    {
      var xNo = new Array();
      var yHum = new Array();
      var url = "http://localhost/rekomendasiwisata/Raspi04/api/apiGetDataJson_humciga.php";
      $.ajax({   
      type: "GET",    
        url: url,
        dataType: 'json',
        cache: false,
        success: function(response){           
          for(i=0;i<response.records.length;i++){
            xNo[i] = response.records[i].no;
            yHum[i] = parseInt(response.records[i].hum);
            console.log(yHum[i]);                  
          }
          predictHum(xNo, yHum);
        }            
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Request failed. Show error message to user. 
        // errorThrown has error message.
        alert("a" +errorThrown);
      });
    }

  function predictHum(t, y)
  {
    var options = {
        series: {
            lines: {
                show: true
            },
            points: {
                show: false
            }
        },
        grid: {
            hoverable: true //IMPORTANT! this is needed for tooltip to work
        },
        yaxis: {
            min: 0,
            max: 120
        },
        tooltip: true,
        tooltipOpts: {
            //content: "'%s' of %x.1 is %y.4",
            shifts: {
                x: -60,
                y: 25
            }
        }
    };


    var t2 = new Array();
    var tY = new Array();
    var ar = new Array();
    var ma = new Array();
    var coef1 = 0.99;
    var coef2 = 0.065;
    var err = new Array();

    var sumT=0;
    var sumY=0;
    var sumTY=0;
    var sumT2=0;
    var a, b;
    var lastT=0;
    console.log("------- Data Asli ---------")
    console.log(y);


    for(i=0;i<t.length;i++){
      nt = parseInt(t[i]);
      ny = parseInt(y[i]);
      nyPrev = parseInt(y[i-1]);
      if (i<1)
      {
        ar[i] = ny;
        ma[i] = Math.abs(ar[i]-ny);
        err[i] = ma[i]*ma[i];
      } 
      else
      {
        ar[i]=(nyPrev*coef1) + (ma[i-1] * coef2);
        ma[i] = Math.abs(ar[i]-nyPrev);
        err[i] = ma[i]*ma[i];                
      }   
      lastT=lastT+1;      
    }
    console.log("Last T = " +lastT);

    console.log("------- Data Auto Regresive  ---------")
    console.log(ar);
    console.log("------- Data Moving Average  ---------")
    console.log(ma);
    console.log("------- Data Error  ---------")
    console.log(err);


    // Plot Ke Chart ------------------------------------
    var dataOri = [],
        dataPredict = [];

    for (var i = 0; i < y.length; i++) {
        ny = parseInt(y[i]);
        dataOri.push([i, ny]);  
    }
    for (var i = 0; i < ar.length; i++) {
        pY = parseInt(ar[i]);
        dataPredict.push([i, pY]);        
    }

    var plotObj = $.plot($("#flot-line-chart-ciga3"), [{
            data: dataOri,
            label: "data Original"
        }, {
            data: dataPredict,
            label: "data Prediksi"
        }],
    options);
    // ------------------------------------------------------------



    console.log("------- Data Prediksi 30 Hari Kedepan ---------")
    var tYNew = new Array();
    tYNew = y;
    var n = 0;

    for(i=0;i<t.length;i++){      
      var sumY=0;
      for(j=n; j<tYNew.length; j++)
      {
        ny = parseInt(tYNew[j]); 
        sumY=sumY+ny;                        
      }

      avgY=sumY/t.length;      
      n=n+1; 

      tYNew[lastT] = avgY;
      lastT++;            

      //tYNew.push(avgY); 
    }    
    console.log("------- Data Y Baru  ---------")
    console.log(tYNew);

    for(k=t.length;k<tYNew.length;k++)
    { 
      nyPrev = parseInt(tYNew[k]);
      ar[k]=(nyPrev*coef1) + (ma[k-1] * coef2);
      ma[k] = Math.abs(ar[k]-nyPrev);
      err[k] = ma[k]*ma[k];
    }

    console.log("------- Data Y (AR, MA, Error)  ---------")
    console.log(ar);
    console.log(ma);
    console.log(err);

    var avgAR = 0
    for(i=0;i<ar.length;i++)
    {
      avgAR = avgAR + ar[i];
    }
    avgAR = avgAR / ar.length;
    console.log("------- Rata-Rata AR  ---------")
    console.log(avgAR);
    

    var nErr = 0
    for(i=0;i<err.length;i++)
    {
      nErr = nErr + err[i];
    }
    nErr = nErr / err.length;    
    console.log("------- Rata-Rata Error  ---------")
    console.log(nErr);
    console.log("------- Y Prediksi  ---------")
    yPred = avgAR;
    yPred = yPred.toFixed(2);
    console.log(yPred);


    var dataLongPredict = [];
    for(i=t.length;i<ar.length;i++)
    {
      newY = parseInt(ar[i]);
      dataLongPredict.push([i, newY]);
    }

    var plotObj2 = $.plot($("#flot-line-chart-ciga4"), [{
            data: dataLongPredict,
            label: "data Prediksi " 
        }],
    options);

    vErr = nErr.toFixed(2);
    document.getElementById('avgDataciga3').innerHTML = "Rata-Rata : " +yPred;
    document.getElementById('avgDataciga4').innerHTML = "Mean Square Error : <b>" +vErr +"<b>";
    document.getElementById('avgNciga2').innerHTML = yPred;
  }  
});