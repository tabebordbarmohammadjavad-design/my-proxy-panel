// BPB Panel - Final Version
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const uuid = env.UUID || env.user_id;
    
    // اگر کاربر آدرس درست با UUID را بزند، پنل باز شود
    if (url.pathname.includes(uuid)) {
      return new Response(renderAdminPanel(env), {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    // اگر آدرس اشتباه باشد، ارور بدهد
    return new Response('Something went wrong! Please use your secret link.', { status: 400 });
  }
};

function renderAdminPanel(env) {
  return `
  <html>
    <body style="background:#1a1a1a;color:#fff;font-family:sans-serif;text-align:center;padding:50px;">
      <h1>🎉 پیروزی! پنل شما با موفقیت فعال شد</h1>
      <p>حالا می‌توانید کانفیگ‌ها را بردارید</p>
      <div style="background:#333;padding:20px;border-radius:10px;word-break:break-all;">
        vless://${env.UUID}@1.1.1.1:443?encryption=none&security=tls&sni=${env.UUID}.workers.dev&fp=randomized&type=ws&host=${env.UUID}.workers.dev&path=%2F%3Fed%3D2048#My-Private-V2Ray
      </div>
    </body>
  </html>`;
}
