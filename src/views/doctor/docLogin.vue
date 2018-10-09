<!-- 登录页, 检查报告验证码页-->
<style lang="scss" scoped>
  .htmlOrbodybg{
    background-color:#f4f4f4;
  }
  #loginBox{
    height: 100vh;
    background-color:#f4f4f4;
    padding-top:0.9rem;
  }
  .inputBox{
    width: 86%;
    background:#fff ;
    margin:0 auto;
    border-radius: 0.08rem;
    overflow:hidden;
  .inputItem{
    background-color: #fff;
    padding:0.28rem 0.4rem;

  input{
    width:100%;
    outline: none;
    border: none;
    font-size: 16px;
    color: #999;
    -webkit-appearance: none;
    background-color: #fff;
    height:0.5rem;
    line-height: 0.5rem;


  }
  &.docPhone{
     border-bottom:1px solid #d2d2d2;
     position:relative;
  .phoneClose{
    color:#ccc;
    position: absolute;
    right:0.2rem;
    top:0.3rem;

  }
  }
  }
  input::-webkit-input-placeholder {
    color: #999;
    font-size: 16px;
  }
  .docCode{
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
  .docCodeFont{
    width:60%;
  }
  .getCode {
    width:35%;
    font-size: 0.28rem;
    color: #ccc;
    border: none;
    background-color: transparent;
    outline: none;
  &.active{
     color: #5ab5ba;
   }
  }
  }
  }
  .toInfo {
    display: block;
    outline: none;
    margin: 0 auto;
    margin-top:0.9rem;
    width: 90%;
    height: 0.9rem;
    background: #5ab5ba;
    border:none;
    color: #ffffff;
    border-radius: 0.45rem;
  }

  .infoLogin{
    color:#999;
    line-height: 0.36rem;
    margin-top:0.35rem;
    width:90%;
    color:#666;
  .checkBox{
    display:inline-block;
    margin-top:-2px;
    vertical-align: middle;
    zoom: 130%;


  }
  i{
    color:#5ab5ba;
  }
  }
  .btnnot_on{
    background-color: #c5eef0;
  }
  .layerbox{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:100%;
    background-color: rgba(0,0,0,0.6);
  .con_comfirm{
    position: absolute;
    top:50%;
    left:50%;
    width:80%;
    height: 80vh;
    background-color: #fff;
    border-radius:0.1rem;
    overflow:hidden;
    margin-top:-40vh;
    margin-left:-40%;
  .tit{
    height: 1.26rem;
    line-height: 1.26rem;
  }
  .con{
    overflow-y:scroll;
    height:56vh;
    color:#333;
    line-height: 0.44rem;
    padding:0 0.3rem;
  }
  .btnBox{
    position: absolute;
    bottom: 0;
    left: 0;
    background:#59b5bb;
    color:#fff;
    height: 0.92rem;
    line-height: 0.92rem;
    width: 100%;
  }
  }
  }
</style>

<template>
  <div id="loginBox">
    <div class="inputBox">
      <div class="docPhone inputItem">
        <input pattern="[0-9*]"  type="tel" maxlength="11" v-model="requestJson.phone" placeholder="请输入您的手机号码"/>
        <i class="phoneClose iconfont icon-closecircled fr" v-show="isShowClearPhone" @click="clearPhone"></i>
      </div>
      <div class="codeBox inputItem">
        <div class="docCode ">
          <div class="fontBox docCodeFont">
            <input pattern="[0-9*]" type="tel" maxlength="4" class="codeInput" placeholder="请输入验证码" v-model="requestJson.code"/>
          </div>
          <button id="getCode" class="getCode" :class="{'active': isCode}" @click="getMsgCode($event)">{{getCode}}</button>
        </div>
      </div>
    </div>
    <div class="infoLogin">
      <p class=" fs30 text-center">
        <label @click="agreeRead">
          <input class="checkBox" type="checkbox" id="agreeRead">
          已阅读并同意 <i @click="patArgeeBook">《医生使用协议》</i>
        </label>
      </p>
    </div>
    <button class="toInfo" :class="{'btnnot_on': loginIsOn}" @click="toLogin">
      <label class="mint-button-text fs32">登 录</label>
    </button>
    <div class="layerbox" v-show="islayershow">
      <div class="con_comfirm">
        <div class="tit text-center fb">用户注册协议</div>
        <div class="con fs28">
          <p>本协议是与CCVHC（中国治愈肝炎联盟）公众号（简称“本公众号”）之间就CCVHC（中国治愈肝炎联盟）公众号服务等相关事宜所订立的契约。
            【审慎阅读】您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。免除或者限制责任的条款将以下划线标识，您应重点阅读。如您对协议有任何疑问，可向CCVHC（中国治愈肝炎联盟）客服咨询。
            【签约动作】当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与CCVHC（中国治愈肝炎联盟）达成一致，成为CCVHC（中国治愈肝炎联盟）平台用户。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册、登录或使用本协议所涉服务。
          </p>
          <h4>一、服务内容：</h4>
          <p>1.1CCVHC（中国治愈肝炎联盟）保留随时变更、中断或终止部分或全部网络服务的权利。</p>
          <p>1.2CCVHC（中国治愈肝炎联盟）作为医生、患者间交流互通平台，用户通过CCVHC（中国治愈肝炎联盟）发表的各种言论（包括但不仅限于医学文献、诊疗建议、患者评价等），并不代表CCVHC（中国治愈肝炎联盟）赞同其观点或证实其内容的真实性，也不能作为临床诊断及医疗的依据，不能替代医生与病人面对面的诊断和治疗。</p>
          <p>1.3CCVHC（中国治愈肝炎联盟）仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如电脑、调制解调器及其他与接入互联网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费）均应由您自行负担。</p>
          <p> 1.4CCVHC（中国治愈肝炎联盟）不承担因不可抗力、自身过错、网络状况、通讯线路等技术原因或其他不可控原因而导致不能正常使用CCVHC（中国治愈肝炎联盟）所导致的直接和间接损失，亦不承担任何法律责任。</p>
          <h4>二、用户及注册：</h4>
          <p>2.1CCVHC（中国治愈肝炎联盟）提供用户注册，用户账号和密码由您自行保管；您应当对以您的帐号进行的所有活动和事件负法律责任。</p>
          <p>2.2您在注册时，账号名称、头像和简介等注册信息中不得出现违法和不良信息，并进行实名认证，CCVHC（中国治愈肝炎联盟）有权采取合理方式对医生身份进行核实，并对通过认证的医生提供相应服务。医生未能通过身份认证的，CCVHC（中国治愈肝炎联盟）有权将网页认证关联信息删除。</p>
          <h4>三、用户的权利和责任：</h4>
          <p>3.1您有权利拥有自己在CCVHC（中国治愈肝炎联盟）的用户名及密码，并有权利使用自己的用户名及密码随时登陆CCVHC（中国治愈肝炎联盟）。</p>
          <p>3.2您不得以任何形式转让或授权他人使用自己的CCVHC（中国治愈肝炎联盟）用户名，亦不得盗用他人帐号，由以上行为造成的后果由您自行承担。</p>
          <p>3.3您有权根据CCVHC（中国治愈肝炎联盟）管理规定发布、获取信息，进行医患互通交流等。</p>
          <p>3.4您对自己在CCVHC（中国治愈肝炎联盟）上发布的信息承担责任，不得发布违法信息，不得恶意评价其他用户。您在使用CCVHC（中国治愈肝炎联盟）时实施的所有行为均应遵守国家法律、法规和CCVHC（中国治愈肝炎联盟）管理规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。</p>
          <p>3.5您必须遵守卫生部《互联网医疗卫生信息服务管理办法》及国家食品药品监督管理局的有关法规，认证医生只能提供医疗卫生信息建议，不得从事网上诊断和治疗活动，不得进行广告性质宣传活动。</p>
          <p>3.6不得将涉及医疗纠纷的问题或其它有责任争议的问题在CCVHC（中国治愈肝炎联盟）发布，关于医疗纠纷的问题，请另行咨询律师或相关主管部门寻求援助，CCVHC（中国治愈肝炎联盟）有权将此类信息删除。</p>
          <p>3.7如您发现其他用户有违法或违反CCVHC（中国治愈肝炎联盟）管理规定的行为，可以向CCVHC（中国治愈肝炎联盟）进行反映要求处理。您因CCVHC（中国治愈肝炎联盟）展示的内容与其他用户发生纠纷的，司法部门可以要求CCVHC（中国治愈肝炎联盟）根据法律程序提供该案件所需证据材料。CCVHC（中国治愈肝炎联盟）有权使用用户的注册信息、用户名、密码等信息，登陆进入用户的注册账户，进行证据保全，包括但不限于公证、见证、协助司法机关进行调查取证等。</p>
          <p>3.8您应关注并遵守本公众号不时公布或修改的各类合法规则规定。</p>
          <h4>四、CCVHC（中国治愈肝炎联盟）的权利和责任</h4>
          <p>4.1CCVHC（中国治愈肝炎联盟）将协助医患之间进行合法的交流，并提供必要的网络技术帮助；</p>
          <p>4.2CCVHC（中国治愈肝炎联盟）有义务在现有技术上维护整个网络平台的正常运行，并努力提升和改进技术，使您网上交流、互助得以顺利进行；</p>
          <p>4.3CCVHC（中国治愈肝炎联盟）作为医患互通服务的平台，不对用户发布信息的来源和正确性负责，不参与医患交流，不对医患交流的结果承担任何责任；</p>
          <p>4.4由于网站上信息数量庞大，CCVHC（中国治愈肝炎联盟）会尽最大努力保证用户所浏览信息的准确性。但由于互联网技术因素等客观原因导致本公众号显示的信息可能会有一定的滞后性或差错，对此情形请您知悉并理解；</p>
          <p>4.5对于用户在CCVHC（中国治愈肝炎联盟）上的不当行为或其它任何CCVHC（中国治愈肝炎联盟）认为应当终止服务的情况，CCVHC（中国治愈肝炎联盟）有权随时作出删除相关信息、终止服务提供等处理，而无需征得用户的同意；</p>
          <p>4.6CCVHC（中国治愈肝炎联盟）没有义务对所有用户的注册数据、所有的活动行为以及与之有关的其它事项进行审查，但如存在下列情况，CCVHC（中国治愈肝炎联盟）有权根据不同情况选择保留或删除相关信息或继续、停止对该用户提供服务，并追究相关法律责任：</p>
          <p class="three_c">4.6.1用户或其它第三方通知CCVHC（中国治愈肝炎联盟），认为某个具体用户、具体行为、具体事项可能存在重大问题；</p>
          <p class="three_c">4.6.2用户或其它第三方向CCVHC（中国治愈肝炎联盟）告知网络平台上有违法或不当行为的，CCVHC（中国治愈肝炎联盟）以普通非专业医疗人员的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为具有违法或不当性质的；</p>
          <p>4.7您在CCVHC（中国治愈肝炎联盟）上如与其他用户产生纠纷，请求CCVHC（中国治愈肝炎联盟）从中予以调处，经CCVHC（中国治愈肝炎联盟）审核后，CCVHC（中国治愈肝炎联盟）有权向纠纷双方了解情况，并将所了解的情况互相通知对方；CCVHC（中国治愈肝炎联盟）所作出的调处行为不具有法律效力，调处结果系由纠纷双方自愿作出，CCVHC（中国治愈肝炎联盟）仅协助提供信息的沟通，不对调处结果承担相应法律责任。</p>
          <p>4.8CCVHC（中国治愈肝炎联盟）有权对用户的注册数据及活动行为进行查阅，发现注册数据或活动行为中存在任何问题或怀疑，均有权向用户发出询问及要求改正的通知或者直接作出删除等处理；</p>
          <p>4.9经国家生效法律文书或行政处罚决定确认用户存在违法行为，或者CCVHC（中国治愈肝炎联盟）有足够事实依据可以认定用户存在违法或违反CCVHC（中国治愈肝炎联盟）管理规定的行为的，CCVHC（中国治愈肝炎联盟）有权以合理方式公布用户的违法行为；</p>
          <p>4.10因不可抗力（如火灾、水灾、暴动、骚乱、战争、自然灾害等）导致CCVHC（中国治愈肝炎联盟）的服务中断或者用户数据损坏、丢失等，CCVHC（中国治愈肝炎联盟）不承担任何责任；</p>
          <p>4.11 许可使用权：用户以此授予CCVHC（中国治愈肝炎联盟）独家的、全球通用的、永久的、免费的许可使用权利，使CCVHC（中国治愈肝炎联盟）有权(全部或部分) 使用、复制、修订、改写、发布、翻译、分发、执行和展示您公示于网站的各类信息或制作其派生作品，和/或以现在已知或日后开发的任何形式、媒体或技术, 将上述信息纳入其它作品内。</p>
          <p>4.12版权保护：本公众号上所有内容的汇编是CCVHC（中国治愈肝炎联盟）的排他财产，受中国和国际版权法的保护。</p>
          <h4>五、服务变更、中断或终止：</h4>
          <p>5.1如因系统维护或升级的需要而需暂停网络服务，CCVHC（中国治愈肝炎联盟）将尽可能事先进行通告。</p>
          <p>5.2如发生下列任何一种情形，CCVHC（中国治愈肝炎联盟）有权解除本协议：</p>
          <p class="three_c">5.2.1用户自愿注销的；</p>
          <p class="three_c">5.2.2用户违反国家有关法律法规或CCVHC（中国治愈肝炎联盟）管理规定，侵害他人合法权益的；</p>
          <p class="three_c">5.2.3用户因在CCVHC（中国治愈肝炎联盟）上的不当行为被行政或司法机构拘留或起诉；</p>
          <p class="three_c">5.2.4医生认证用户被有关部门吊销执业医师证书；</p>
          <p class="three_c">5.2.5用户提供的个人资料不真实；</p>
          <p class="three_c">5.2.6用户盗用他人账户、发布违禁信息、骗取他人财物的；</p>
          <p class="three_c">5.2.7用户传播虚假信息，歪曲事实，经查证属实的；</p>
          <p class="three_c">5.2.8其它CCVHC（中国治愈肝炎联盟）认为需要终止服务的情况。
          除前款所述情形外，CCVHC（中国治愈肝炎联盟）保留在不事先通知用户的情况下随时中断或终止部分或全部网络服务的权利，对于服务的中断或终止而造成用户损失的，CCVHC（中国治愈肝炎联盟）不承担任何责任。</p>
          <p>5.3用户服务终止后，CCVHC（中国治愈肝炎联盟）仍有以下权利：</p>
          <p class="three_c">5.3.1用户注销后，CCVHC（中国治愈肝炎联盟）有权保留该用户的注册数据及以前的行为记录；</p>
          <p class="three_c">5.3.2用户注销后，如用户在注销前在CCVHC（中国治愈肝炎联盟）平台上存在违法行为或违反条款的行为，CCVHC（中国治愈肝炎联盟）仍可行使本服务条款所规定的权利；</p>
          <h4>六、隐私声明：</h4>
          <p>6.1适用范围</p>
          <p class="three_c">6.1.1用户注册CCVHC（中国治愈肝炎联盟）时，根据公众号要求提供的个人信息；</p>
          <p class="three_c">6.1.2用户使用CCVHC（中国治愈肝炎联盟）服务、参加相关活动、访问公众号时，网站自动接收并记录您浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及用户要求取用的网页记录；</p>
          <p class="three_c">6.1.3 CCVHC（中国治愈肝炎联盟）通过合法途径从其他途径取得的用户个人资料。</p>

          <p>6.2信息保密</p>
          <p class="three_c">6.2.1保护用户隐私是CCVHC（中国治愈肝炎联盟）的一项基本政策，CCVHC（中国治愈肝炎联盟）保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储的非公开内容，但下列情况除外：事先获得用户的明确授权；根据有关的法律法规要求；按照相关政府主管部门的要求；为维护社会公众的利益；为维护CCVHC（中国治愈肝炎联盟）的合法权益。</p>
          <p class="three_c">6.2.2 CCVHC（中国治愈肝炎联盟）可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与CCVHC（中国治愈肝炎联盟）同等的保护用户隐私的责任，则CCVHC（中国治愈肝炎联盟）有权将用户的注册资料等提供给该第三方。</p>
          <p>6.3信息使用：</p>
          <p class="three_c">6.3.1CCVHC（中国治愈肝炎联盟）不会向任何人出售或出借您的个人信息，除非事先得到您的许可。</p>
          <p class="three_c">6.3.2在不透露您隐私资料的前提下，CCVHC（中国治愈肝炎联盟）有权对整个数据库进行分析并对数据库进行使用。</p>
          <p class="three_c">6.3.3CCVHC（中国治愈肝炎联盟）不对您所发布信息的删除或储存失败负责，CCVHC（中国治愈肝炎联盟）积极采用数据备份加密等措施保障您数据的安全，但不对由于意外因素导致的数据损失和泄露负责。</p>
          <p class="three_c">6.3.4为服务用户的目的，CCVHC（中国治愈肝炎联盟）可能通过使用用户的个人信息，向用户提供服务，包括但不限于向用户发出活动和服务信息等。</p>

          <p>6.4信息披露:您的个人信息将在下述情况下部分或全部被披露</p>
          <p class="three_c">6.4.1经您同意，向第三方披露</p>
          <p class="three_c">6.4.2如您是符合资格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷</p>
          <p class="three_c">6.4.3根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露</p>
          <p class="three_c">6.4.4如果您出现违反中国有关法律或者网站政策的情况，需要向第三方披露</p>
          <p class="three_c">6.4.5为提供您所要求的产品和服务，而必须和第三方分享您的个人信息</p>
          <p class="three_c">6.4.6其他本网站根据法律或者网站政策认为合适的披露</p>
          <p>6.5信息授权</p>
          <p class="three_c">6.5.1本人授权CCVHC（中国治愈肝炎联盟），除法律另有规定之外，将本人提供给CCVHC（中国治愈肝炎联盟）的信息、享受CCVHC（中国治愈肝炎联盟）服务产生的信息（包括本用户协议签署之前提供和产生的信息）以及CCVHC（中国治愈肝炎联盟）根据本条约定查询、收集的信息，用于CCVHC（中国治愈肝炎联盟）及其因服务必要委托的合作伙伴为本人提供服务、推荐产品、开展市场调查与信息数据分析。</p>
          <p class="three_c">6.5.2本人授权CCVHC（中国治愈肝炎联盟），除法律另有规定之外，基于为本人提供更优质服务和产品的目的，向CCVHC（中国治愈肝炎联盟）因服务必要开展合作的伙伴提供、查询、收集本人的信息。</p>
          <p class="three_c">6.5.3为确保本人信息的安全，CCVHC（中国治愈肝炎联盟）及其合作伙伴对上述信息负有保密义务，并采取各种措施保证信息安全。</p>
          <p class="three_c">6.5.4本条款自本协议签署时生效，具有独立法律效力，不受合同成立与否及效力状态变化的影响。</p>
          <p class="three_c">6.5.5如您不同意上述授权条款的部分或全部，可〔致电客服热线〕取消或变更授权。</p>
          <h4>七、免责声明：</h4>
          <p>7.1用户使用CCVHC（中国治愈肝炎联盟）服务所存在的风险将完全由其自己承担；因其使用CCVHC（中国治愈肝炎联盟）服务而产生的一切后果也由其自己承担，CCVHC（中国治愈肝炎联盟）对用户不承担任何责任。</p>
          <p>7.2CCVHC（中国治愈肝炎联盟）不担保网络服务一定能满足用户的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</p>
          <p>7.3CCVHC（中国治愈肝炎联盟）不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由CCVHC（中国治愈肝炎联盟）实际控制的任何网页上的内容，CCVHC（中国治愈肝炎联盟）不承担任何责任。</p>
          <p>7.4对于因不可抗力或CCVHC（中国治愈肝炎联盟）不能控制的原因造成的网络服务中断或其它缺陷，CCVHC（中国治愈肝炎联盟）不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
          <h4>八、违约赔偿：</h4>
          <p>用户同意保障和维护CCVHC（中国治愈肝炎联盟）及其他用户的利益，如因用户违反有关法律、法规或CCVHC（中国治愈肝炎联盟）管理规定而给CCVHC（中国治愈肝炎联盟）或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。</p>
          <h4>九、服务条款修改：</h4>
          <p>9.1CCVHC（中国治愈肝炎联盟）有权根据服务情况变更、终止CCVHC（中国治愈肝炎联盟）管理规定的各项条款，CCVHC（中国治愈肝炎联盟）将会通过适当方式向您提示修改内容。</p>
          <p>9.2如果您不同意CCVHC（中国治愈肝炎联盟）管理规定所做的修改，有权停止使用网络服务。如果您继续使用网络服务，则视为您接受CCVHC（中国治愈肝炎联盟）对服务条款相关条款所做的修改。</p>
          <h4>十、法律管辖：</h4>
          <p>10.1本服务条款的订立、执行和解释及争议的解决均应适用中国法律。</p>
          <p>10.2如双方就本服务条款内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向CCVHC（中国治愈肝炎联盟）所在地的人民法院提起诉讼。</p>
          <h4>十一、通知送达:</h4>
          <p>11.1本协议项下CCVHC（中国治愈肝炎联盟）对于您所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。/p>
          <p>11.2 您对于CCVHC（中国治愈肝炎联盟）的通知应当通过CCVHC（中国治愈肝炎联盟）对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</p>
          <h4>十二、其他规定:</h4>
          <p>12.1本服务条款构成双方对服务条款之约定事项及其他有关事宜的完整协议，除服务条款规定的之外，未赋予服务条款各方其他权利。</p>
          <p>12.2，如本服务条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本条款的其余条款仍应有效并且有约束力。</p>
          <p>12.3CCVHC（中国治愈肝炎联盟）尊重用户和消费者的合法权利，本协议及本公众号上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。本公众号欢迎用户和社会各界提出意见和建议，CCVHC（中国治愈肝炎联盟）将虚心接受并适时修改本协议及本公众号的各类规则。</p>
          <p>12.4您注册使用本公众号即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</p>

        </div>
        <div class="btnBox fs32 fb text-center" @click="readAticle">
          已阅读并同意
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import axios from 'axios';
  import {MessageBox,Toast, Indicator} from 'mint-ui';
  import netWrokUtils from '../../components/NetWrokUtils'

  var timer = null;

  export default {
    beforeRouteEnter(to, from, next){

      var userid = localStorage.getItem(appUserId);
      var params = {
        authentication: auth,
        user_id: userid ? userid :''
      };

      function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      }
      netWrokUtils.post('/wechat/' + gzhId + '/doctorStatus', params, (result) => {
        //status  1、未完善信息；2、已完善信息；3、账号在其他设备登录，请重新登录； 4、未登录
        let status = result.data.data.status;
        if(status == 3 || status == 4){
          if(status == 4){
            //如果初始链接跳转进来
            if(getParameterByName("is_login")){
              next(true);
            }else{
              localStorage.setItem(appUserId, "");
              localStorage.setItem(authKey, "");

              next({name: 'docLogin'})
            }
          }
          next(true);
        }else if(status == 1){
//          next({name: 'patInfoPerfect', query: {'from': to.path}}) //去完善信息页
        }else{
          Toast('已登录成功！');
          //部分andriod机无法关闭窗口
          var parser = new UAParser();
          let message = parser.getResult();
          if(message.os.name == "Android"){
            setTimeout(()=>{
              wx.closeWindow();
            }, 1500);
          }else{
            wx.closeWindow();
          }
        }
      }, (error_result) => {
        Toast(error_result.data.msg);
      })
    },
    data() {
      return {
        getCode: "获取验证码",
        time: 60,
        isCode: false,
        active: false,
        code: '',
        authentication: auth,
        flag_testReportIdentityCard: false,
        requestJson: {
          phone: '',
          code: '',
          tempPhone: ''
        },
        isShowClose: false,
        isShowClearPhone: false,
        phonetype:'',
        loginIsOn:true,
        isShowClearPhone:false, //清空手机号
        islayershow:false, //是否显示用户协议

      }
    },
    created() {
      //设置bodybg
      document.getElementsByTagName("body")[0].style.background = "#f4f4f4";
      var parser = new UAParser();
      this.phonetype = parser.getResult().os.name;

    },
    mounted(){
      document.getElementsByTagName('title')[0].innerHTML = '用户登录';
      var that = this;
      setTimeout(function(){
        that.islayershow = true;
      }, 700);
    },
    watch: {
      'requestJson.phone'(){
        if (!(/^1[34578]\d{9}$/.test(this.requestJson.phone))) {
          this.isCode = false;
          this.isShowClearPhone = true;
          this.loginIsOn = true;
        }else{
          if(this.requestJson.code.length == 4){
            this.loginIsOn = false;
          }else{
            this.loginIsOn = true;
          }
          this.isShowClearPhone = true;
          this.time = 60;
          this.isCode = true;
          clearInterval(timer);       //停止计时器
          document.getElementById("getCode").innerHTML = '获取验证码';
        }
        if(!this.requestJson.phone){
          this.isShowClearPhone = false;
        }
      },
      'requestJson.code'() {
        if (this.requestJson.code.length == 4 && this.requestJson.phone){
          this.loginIsOn = false;
        } else {
          this.loginIsOn = true;
        }
      },
    },
    methods: {
      getMsgCode(el) {
        if(!this.isCode){
          return false;
        }
        if (!(/^1[34578]\d{9}$/.test(this.requestJson.phone))) {
          Toast('请输入正确手机号！');
          return false
        } else {

          let _that = this;
          if (this.time >= 0 && !this.isCode) {

            return false
          } else {

            var params = {
              mobile: this.requestJson.phone
            }

            // 获取验证码
            netWrokUtils.post('/wechat/'+ gzhId +'/sendCode', params, (result) => {
//              this.requestJson.code = result.data.data.code;
              //请求成功

              this.isCode = false;
              //停止计时器
              clearInterval(timer);
              timer = setInterval(function () {
                if (_that.time >= 0) {
                  el.target.innerHTML = _that.time + '（s）'
                  _that.time--;

                }
                if (_that.time === -1) {
                  _that.time = 60;
                  _that.isCode = true;
                  clearInterval(timer);       //停止计时器
                  el.target.innerHTML = '获取验证码'
                }
              }, 1000)

              Indicator.close();
            }, (error_result) => {


              Indicator.close();
              console.log(error_result);
              Toast(error_result.data.msg);
            })
          }
        }
      },
      clearPhone(){
        this.requestJson.phone = ''
      },
      toLogin(){
        if(this.loginIsOn){
          return false;
        }else{
          this.loginIsOn = false;
        }


        let _this = this;
        if (_this.requestJson.phone == '' || _this.requestJson.phone.length != 11) {
          Toast('请输入手机号码！');
          return false
        } else if (!this.checkPhone(_this.requestJson.phone)) {
          Toast('请输入正确手机号码！');
          return false
        }
        if (_this.requestJson.code == '' || _this.requestJson.code.length != 4) {
          Toast('请输入正确验证码！');
          return false
        }
        Indicator.open('登录中');

        var params = {
          authentication: auth,
          mobile: _this.requestJson.phone,
          type: _this.phonetype,
          code:_this.requestJson.code
        }

        netWrokUtils.post('/wechat/' + gzhId + '/login', params, (result) => {

          //在其他设备登陆
          if(result.data.code == 100004){
            MessageBox.confirm('您的帐号已在其它设备登录，您是否要在本设备登录您的账号？').then(action => {
              netWrokUtils.post('/wechat/' + gzhId + '/replaceDevice', params, (result) => {
                Indicator.open('登录成功');
                localStorage.setItem(appUserId, result.data.data.user_id);
                //status  状态 1：未完善信息
                wx.closeWindow(); //已完善

              }, (error_result) => {
                Toast(error_result.data.msg);
              })
            },action => {
              Toast(error_result.data.msg);
            });
            return false;

//            正常登陆
          }else{
            Indicator.open({text:'登录成功',spinnerType:'snake'});
            localStorage.setItem(appUserId, result.data.data.user_id);
            Indicator.close();
            wx.closeWindow();
          }
          this.loginIsOn = false;
        }, (error_result) => {
          this.loginIsOn = false;
          Indicator.close();
          Toast(error_result.data.msg);
        })
      },
      checkPhone(phone) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
          return false;
        } else {
          return true;
        }
      },
      goUserSignDeal(){
        this.$router.push({name: 'userSignDeal'})
      },
      readAticle(){
        this.islayershow = false;
        document.getElementById("agreeRead").checked = true;
      },
      agreeRead(){
        event.preventDefault();
        return false;
      },
      patArgeeBook(){
        this.islayershow = true;
      }
    }
  }

</script>

