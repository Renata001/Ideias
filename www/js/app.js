var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Projeto saúde',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {   
        path: '/home/',
       
        url: 'index.html?l=g', 
        on:{
          pageInit:function(){
       
          },
        },      
      },
      {   
        path: '/login/',
        url: 'login.html?p=8', 
        on:{
          pageInit:function(){
            mostrando();
            login();
           
            cadastro();
          },
        },      
      },
   
      {
        path: '/inicio/',
        url: 'inicio.html?v=v',
        on:{
          pageInit:function(){
            inicio();
          },
        }, 
      },
    ],
    // ... other parameters
  });
  var mainView = app.views.create('.view-main'); 
    var $$ = Dom7;
    
    const cod_usuario = localStorage.getItem('ID_cadastro');

    
 

    
    $("#sairIndex").click(function(){
      localStorage.removeItem('ID_cadastro');
      localStorage.removeItem('usuario');
      
      btnLogout();
    });

    $("#sair2").click(function(){
      localStorage.removeItem('ID_cadastro');
      localStorage.removeItem('usuario');
      app.views.current.router.back(); 
      btnLogout();
    });
  
    
    // function  btnL(){
      
    //   $(".inicio").hide(); 
    //    $(".banner").show();
    //   $("#sairIndex").hide();
    //   $(".login").show();
    //     app.views.current.router.back();
       
    // }

     
 

    // $(".inicio").hide();
    // $("#sairIndex").hide();
    
   
  
    //  $(".foto-comida").hide();
  
    window.onload= function(){  
   
      if(cod_usuario){
     
        $(".banner").hide(); 
        $(".inicio").show();
        $("#sairIndex").show();
        $(".login").hide();
        $(".home").hide();
        $(".mini-menu").show();
  
       
    
      }else{
        $(".home").show();
        $(".inicio").hide(); 
        $(".banner").show();
        $("#sairIndex").hide();
        $(".login").show();
        $(".mini-menu").hide();
  
        
  
        //colocar o botão sair  semelhante=  $("#btn-prato").hide(); 
      }
    }
     function btnLogin(){
       setTimeout(function(){
         $(".inicio").show(); 
         $(".banner").hide();
         $("#sairIndex").show(); 
         $(".login").hide();
         $(".mini-menu").show();
         $(".home").hide();
        
    
       },500);
     }
  
     function btnLogout(){
       setTimeout(function(){
         $(".inicio").hide(); 
         $(".banner").show();
         $("#sairIndex").hide();
         $(".mini-menu").hide();
         $(".login").show();
        
    
       },500);
     }

    function mostrando(){
      $(".cadastroForm").hide();
      $(".TextoC").hide();


      $("#cadastroC").click(function(){
        setTimeout(function(){
          $(".cd").hide();
          $(".cadastroForm").show(); 
          $(".TextoC").show();
          
     
        },500);
        
      });
    }

    function cadast(){
      setTimeout(function(){
        $(".cd").show();
        $(".cadastroForm").hide(); 
        $(".TextoC").hide();
        
   
      },500);
      

    }
 
  

    
    // login
    function login(){


      $("#entrar").click(function(e){
        e.preventDefault(); //evento =  padrão não retorna
  
          var usuario =$("#usuario").val();
          var senha = $("#senha").val();
          if(usuario.trim() == "" || senha.trim() == ""){
            app.dialog.alert("Os campos usuário e senha são obrigatórios!"), "";
            return false
          }
          // alert(email + " | " + senha);
  
          //Requisição AJAX
          app.request({
       
            url:"https://www.limeiraweb.com.br/renata/ideias/PHP/login.php",
            type:"POST",
            dataType:"json",
            data:$("#Formlogin").serialize(),
            success:function(data){
              if(data.resultado != 0){
               
                  app.dialog.preloader("Bem-vindo "+usuario);
                  setTimeout(function () {
                    app.dialog.close();
                  }, 3000);
    
                //  alert("Usuário existe");
                //  console.log(data);
  
                localStorage.setItem('ID_cadastro',data.ID_cadastro);
                localStorage.setItem('usuario',data.usuario);
                // app.views.current.router.back();
                $("#usuario,#senha").val("");
                app.views.current.router.back(); 
                btnLogin();

              }else{
               app.dialog.alert("Usuário ou senha incorretos!","");
              
               $("#usuario,#senha").val("");
             
              }
              
            },
            error: function(e){
              app.dialog.alert("404","Erro");
              $("#usuario,#senha").val("");
            }
          });
      });
         // fim
    

    }
   

 
    function cadastro(){
     
      
      $("#cadastrar").click(function(e){
        e.preventDefault();
  
        var nome_c = $("#nome_c").val();
        var usuario_c = $("#usuario_c").val();
        var senha_c = $("#senha_c").val();
        var data_nasc = $("#data_nasc").val();
        var email = $("#email").val();
        
  
        if(nome_c.trim() == ""){
          app.dialog.alert("verefique a informações digitada no campo Nome","");
          return false;
        }
        if(usuario_c.trim() == ""){
          app.dialog.alert("verefique a informações digitada no campo Usuário","");
          return false;
        }
        if(senha_c.trim() == ""){
          app.dialog.alert("verefique a informações digitada no campo Senha","");
          return false;
        }
        if(data_nasc.trim() == ""){
          app.dialog.alert("verefique a informações digitada no campo Data de nascimento","");
          return false;
        }
        if(email.trim() == ""){
          app.dialog.alert("verefique a informações digitada no campo E-mail","");
          return false;
        }
        
         //insert
         app.request.post('https://www.limeiraweb.com.br/renata/ideias/PHP/insertLogin.php',{
          nome_c:nome_c,
          usuario_c:usuario_c,
          senha_c:senha_c,
          data_nasc:data_nasc,
        email
         },
         function(data){
           if(data != "existe"){
              app.dialog.alert("Cadastrado com sucesso", "");
                $("#nome_c,#usuario_c,#senha_c,#data_nasc,#email").val("");
                $(".cadastroForm").hide();
                $(".cd").show();
                $(".TextoC").hide();
               
                
            }else{
                app.dialog.alert("Usuaário utilizado já existe","");
                $("#nome_c,#usuario_c,#senha_c,#data_nasc,#email").val("");
                
            }
          
         });
      });
  
  
  
  
  
   
    
    }
    