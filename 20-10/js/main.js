(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const BAR = 3000;
  // thời lượng đọc gốc (ms) của 1 "bar" kịch bản
  const BPM = 76.5,
    BEAT = 70000 / BPM,
    OFF = 700;
  // Từng Ngày Yêu Em: nhịp & độ lệch pha (ms)
  function snap(ms) {
    const U = BEAT * 2;
    let d = Math.max(1, Math.round(ms / U)) * U;
    if (!bgm.paused) {
      const t = bgm.currentTime * 1000 - OFF;
      d = Math.max(U * 0.75, Math.round((t + d) / U) * U - t);
    }
    return d;
  }
  const YRS = new Date().getFullYear() - 1930;
  const qp = new URLSearchParams(location.search);
  const TO = (qp.get("to") || "").trim().slice(0, 40),
    FROM = (qp.get("from") || "").trim().slice(0, 40);
  const esc = (s) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  /* ================= 5 THÔNG ĐIỆP ĐẶC BIỆT DÀNH CHO 5 NGƯỜI BẠN ================= */
  const NAME_PROFILES = {
    // 1. Dành cho Giang
    giang: {
      id: "giang",
      displayName: "Giang",
      aliases: [
        "Nguyễn Thị Hương Giang",
        "Nguyễn Thị Hươnggiang",
        "Nguyễn Hương Giang",
        "Nguyen Thi Huong Giang",
        "Nguyen Thi Huonggiang",
        "Nguyen Huong Giang",
        "nguyenthihuonggiang",
        "nguyenhuonggiang",
        "bé Hương Giang",
        "be huong giang",
        "Hương Giang",
        "huong giang",
        "huonggiang",
        "Giang",
      ],
      greeting: "này <em>Giang</em> ơi!",
      msg1_health:
        "chúc Giang luôn tràn đầy <em>sức khỏe</em> — lúc nào cũng tươi tắn, nhiều năng lượng và rạng rỡ mỗi ngày",
      msg2_peace:
        "chúc Giang luôn giữ được sự <em>an yên</em> trong lòng — dù ngày dài có bận rộn đến đâu, tối về vẫn luôn nhẹ nhõm",
      msg3_free:
        "chúc Giang luôn đủ <em>tự do & tự tin</em> — can đảm theo đuổi những điều mình ấp ủ và sống trọn vẹn với đam mê",
      msg4_love:
        "chúc Giang luôn được <em>yêu thương trân trọng</em> — luôn gặp những người đối xử thật dịu dàng và chân thành với Giang",
      praiseMsg:
        "để tớ khen nhé: Giang luôn là con bạn <em>năng động</em>, <em>ấm áp</em> và cực kỳ đáng yêu!",
      finalMsg:
        "Gửi Giang — cô bạn tuyệt vời! Chúc Giang ngày 20/10 ngập tràn niềm vui, nhận được thật nhiều hoa, quà và luôn giữ nụ cười tỏa nắng trên môi nhé. Mãi xinh đẹp, hạnh phúc và thành công trên con đường phía trước! 🌸✨",
    },
    // 2. Dành cho Lan Anh
    lan_anh: {
      id: "lan_anh",
      displayName: "Lan Anh",
      aliases: [
        "Chu Thị Lan Anh",
        "Chu Thi Lan Anh",
        "chu thi lan anh",
        "chuthilananh",
        "Chu Lan Anh",
        "chu lan anh",
        "bé Lan Anh",
        "be lan anh",
        "Lan Anh",
        "lananh",
      ],
      greeting: "này <em>Lan Anh</em> ơi!",
      msg1_health:
        "chúc Lan Anh luôn thật nhiều <em>sức khỏe</em> — dẻo dai,chú ý tới sức khỏe của mình vì hay phải thức đem, và luôn tươi vui và lúc nào cũng ngập tràn năng lượng tích cực",
      msg2_peace:
        "chúc Lan Anh luôn tìm thấy <em>bình yên</em> —  mọi chuyện phiền muộn đều tan biến",
      msg3_free:
        "chúc Lan Anh luôn thỏa sức <em>tự do bay bổng</em> — tự tin làm những điều mình thích và tỏa sáng theo cách riêng",
      msg4_love:
        "chúc Lan Anh luôn được <em>yêu thương vỗ về</em> — luôn được nâng niu, chở che và có những người bạn tốt kề bên",
      praiseMsg:
        "để tớ khen nhé: Lan Anh luôn <em>dịu dàng</em>, <em>tinh tế</em> và mang lại cảm giác rất an lòng cho mọi người!",
      finalMsg:
        "Chúc Lan Anh một ngày 20/10 thật ngọt ngào và hạnh phúc! Mong mỗi ngày của Lan Anh đều có nắng ấm, tiếng cười và những điều may mắn nhất. Cảm ơn vì đã luôn là một người bạn dễ thương và đáng quý! 💖🌷",
    },
    // 3. Dành cho Bảo Trâm
    bao_tram: {
      id: "bao_tram",
      displayName: "Bảo Trâm",
      aliases: [
        "Nguyễn Thị Bảo Trâm",
        "Nguyễn Thị Bảotrâm",
        "Nguyễn Bảo Trâm",
        "Nguyen Thi Bao Tram",
        "Nguyen Thi Baotram",
        "Nguyen Bao Tram",
        "nguyenthibaotram",
        "nguyenbaotram",
        "bé Bảo Trâm",
        "be bao tram",
        "bé Trâm",
        "be tram",
        "Bảo Trâm",
        "bao tram",
        "baotram",
        "Trâm",
      ],
      greeting: "này <em>Bảo Trâm</em> ơi!",
      msg1_health:
        "chúc Bảo Trâm luôn dồi dào <em>sức khỏe</em> — ăn ngon, ngủ ngon và lúc nào cũng xinh đẹp, rạng ngời",
      msg2_peace:
        "chúc Bảo Trâm luôn có một tâm trí <em>bình yên & vững vàng</em> — nhẹ nhàng vượt qua mọi thử thách trong cuộc sống",
      msg3_free:
        "chúc Bảo Trâm luôn có sự <em>tự do & bản lĩnh</em> — tự tay vẽ nên cuộc sống rực rỡ và tự hào về chính bản thân",
      msg4_love:
        "chúc Bảo Trâm luôn được <em>yêu thương đong đầy</em> — được trân quý bởi những người thật lòng thấu hiểu và sẻ chia",
      praiseMsg:
        "để anh khen nhé: Bảo Trâm luôn <em>bản lĩnh</em>, <em>tháo vát</em> và có nụ cười rạng rỡ đầy cuốn hút!",
      finalMsg:
        "Gửi đến Bảo Trâm xinh xắn! Chúc Trâm ngày 20/10 thật nhiều niềm vui, luôn rạng rỡ như một đóa hoa, công việc thuận lợi và mọi điều ước đều sớm thành hiện thực. Chúc Trâm mãi luôn hạnh phúc nhé! 💐🌟",
    },
    // 4. Dành cho Ngọc Trâm
    ngoc_tram: {
      id: "ngoc_tram",
      displayName: "Ngọc Trâm",
      aliases: [
        "Nguyễn Ngọc Trâm",
        "Nguyễn Ngọctrâm",
        "Nguyễn Trâm",
        "Nguyen Ngoc Tram",
        "Nguyen Ngoctram",
        "Nguyen Tram",
        "nguyenngoctram",
        "nguyentram",
        "bé Ngọc Trâm",
        "be ngoc tram",
        "bé Trâm",
        "be tram",
        "Ngọc Trâm",
        "ngoc tram",
        "ngoctram",
        "Trâm",
      ],
      greeting: "này <em>Ngọc Trâm</em> ơi!",
      msg1_health:
        "chúc Ngọc Trâm luôn tràn trề <em>sức khỏe</em> (có sức khỏe để mai mối cho anh) — tinh thần sảng khoái, luôn giữ được sự tươi trẻ và đáng yêu",
      msg2_peace:
        "chúc Ngọc Trâm luôn tìm thấy <em>sự an nhiên</em> — mọi muộn phiền ngoài kia đều dừng lại sau nụ cười của Trâm",
      msg3_free:
        "chúc Ngọc Trâm luôn <em>tự do khám phá</em> — trải nghiệm thêm nhiều điều thú vị và gặt hái thêm nhiều thành công mới",
      msg4_love:
        "chúc Ngọc Trâm luôn được <em>yêu thương chiều chuộng</em> — luôn được chở che và nhận về những điều ấm áp nhất",
      praiseMsg:
        "để anh khen nhé: Ngọc Trâm luôn <em>thông minh</em>, <em>ngọt ngào</em> và luôn biết cách quan tâm người khác!",
      finalMsg:
        "Chúc Ngọc Trâm một ngày 20/10 tràn ngập tiếng cười, nhận được vô số hoa và quà đẹp! Cảm ơn Ngọc Trâm vì sự ấm áp và dễ mến. Chúc Trâm ngày càng xinh đẹp, tự tin và luôn hạnh phúc mỗi ngày! 🌺✨",
    },
    // 5. Dành cho Vân
    van: {
      id: "van",
      displayName: "Vân",
      aliases: [
        "Nguyễn Thị Thảo Vân",
        "Nguyễn Thị Thảovân",
        "Nguyễn Thảo Vân",
        "Nguyen Thi Thao Van",
        "Nguyen Thi Thaovan",
        "Nguyen Thao Van",
        "nguyenthithaovan",
        "nguyenthaovan",
        "bé Thảo Vân",
        "be thao van",
        "Thảo Vân",
        "thao van",
        "thaovan",
        "Vân",
      ],
      greeting: "này <em>Vân</em> ơi!",
      msg1_health:
        "chúc Vân luôn dồi dào <em>sức khỏe</em> — lúc nào cũng tràn đầy sức sống, tươi tắn và rạng rỡ mỗi sớm mai",
      msg2_peace:
        "chúc Vân luôn có một khoảng trời <em>bình yên</em> — nhẹ nhàng như mây trời, không vướng bận những điều âu lo",
      msg3_free:
        "chúc Vân luôn thỏa sức <em>tự do & độc lập</em> — tự tin tỏa sáng trên con đường mình chọn và đạt được ước mơ",
      msg4_love:
        "chúc Vân luôn được <em>yêu thương hết mực</em> — có một tình yêu chân thành và những người bạn luôn đồng hành sẻ chia",
      praiseMsg:
        "để em khen nhé: Vân luôn <em>kiên trì</em>, <em>chân thành</em> và luôn tỏa sáng theo cách rất riêng của mình!",
      finalMsg:
        "Gửi Vân — cô bạn dịu dàng và kiên cường! Chúc Vân ngày 20/10 ngập tràn niềm vui, hoa thơm và những lời chúc ý nghĩa nhất. Chúc Vân luôn an yên, may mắn và hạnh phúc trên mọi chặng đường! 🌸💖",
    },
  };

  function stripDiacritics(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .trim();
  }

  function resolveProfile(inputName) {
    const raw = (inputName || "").trim();
    if (!raw) {
      return {
        displayName: "cậu",
        greeting: "này <em>cậu</em> ơi!",
        msg1_health:
          "chúc cậu thật nhiều <em>sức khỏe</em> — để còn đi hết những nơi cậu muốn đến",
        msg2_peace:
          "chúc cậu <em>bình yên</em> — dù ngoài kia có ồn ào thế nào",
        msg3_free:
          "chúc cậu đủ <em>tự do</em> để làm điều mình thích, và đủ dũng cảm để theo đuổi ước mơ",
        msg4_love:
          "chúc cậu luôn được <em>yêu thương</em> — đúng cách, đúng người, và cả bởi chính mình",
        praiseMsg:
          "để tớ khen nhé: cậu luôn <em>mạnh mẽ</em>, <em>dịu dàng</em> và <em>xứng đáng</em> được yêu thương thật nhiều!",
        finalMsg:
          "mong mỗi ngày của cậu đều có hoa, có nắng, có tiếng cười — và có người yêu thương cậu thật nhiều.",
      };
    }

    const norm = stripDiacritics(raw);

    // Phân biệt Ngọc Trâm vs Bảo Trâm nếu gõ có từ khóa
    if (norm.includes("ngoc")) {
      return { ...NAME_PROFILES["ngoc_tram"], inputName: raw };
    }
    if (norm.includes("bao")) {
      return { ...NAME_PROFILES["bao_tram"], inputName: raw };
    }

    // 1. Khớp chính xác tên hiển thị hoặc bí danh
    for (const key in NAME_PROFILES) {
      const p = NAME_PROFILES[key];
      const matchKey = stripDiacritics(p.displayName);
      if (
        norm === matchKey ||
        p.aliases.some((a) => norm === stripDiacritics(a))
      ) {
        return { ...p, inputName: raw };
      }
    }

    // 2. Khớp một phần
    for (const key in NAME_PROFILES) {
      const p = NAME_PROFILES[key];
      if (
        norm.includes(stripDiacritics(p.displayName)) ||
        p.aliases.some((a) => norm.includes(stripDiacritics(a)))
      ) {
        return { ...p, inputName: raw };
      }
    }

    // 3. Nếu là một tên bạn khác
    return {
      displayName: raw,
      greeting: "này <em>" + esc(raw) + "</em> ơi, em là con trai mà!",
      msg1_health:
        "chúc <em>" +
        esc(raw) +
        "</em> luôn ngập tràn <em>sức khỏe</em> — tươi tắn, dẻo dai và dạt dào năng lượng tích cực",
      msg2_peace:
        "chúc <em>" +
        esc(raw) +
        "</em> luôn có những ngày <em>bình yên</em> — thảnh thơi trong lòng dù ngoài kia có ồn ào thế nào",
      msg3_free:
        "chúc <em>" +
        esc(raw) +
        "</em> luôn đủ <em>tự do & bản lĩnh</em> — tự tin làm điều mình thích và theo đuổi đam mê",
      msg4_love:
        "chúc <em>" +
        esc(raw) +
        "</em> luôn được <em>yêu thương trân trọng</em> — đúng người, đúng cách và cả bởi chính bản thân mình",
      praiseMsg:
        "để tao khen giúp nhé: <em>" +
        esc(raw) +
        "</em> luôn <em>mạnh mẽ</em>, <em>dịu dàng</em> và <em>tỏa sáng</em> theo cách của riêng mình!",
      finalMsg:
        "Gửi tặng <b>" +
        esc(raw) +
        "</b> — người phụ nữ tuyệt vời! Mong mỗi ngày của bạn đều ngập tràn hoa, ngập tràn nắng ấm và tiếng cười. Chúc bạn một ngày 20/10 thật trọn vẹn và hạnh phúc! 🌸",
    };
  }

  let currentProfile = null;

  function applyProfile(rawName) {
    currentProfile = resolveProfile(rawName);

    // 1. Cập nhật câu chào mở đầu
    if (S[0]) {
      S[0].say = currentProfile.greeting;
    }

    // 2. Cập nhật 4 câu chúc chính & câu hỏi tự động
    S.forEach((item) => {
      if (item.scene === "health") {
        item.say = currentProfile.msg1_health;
      } else if (item.scene === "peace") {
        item.say = currentProfile.msg2_peace;
      } else if (item.scene === "free") {
        item.say = currentProfile.msg3_free;
      } else if (item.scene === "love") {
        item.say = currentProfile.msg4_love;
      } else if (item.scene === "question") {
        item.say =
          "cho tớ hỏi một câu thôi nhé…<br>hôm nay <em>" +
          esc(currentProfile.displayName) +
          "</em> đã khen bản thân chưa?";
      }
    });

    // Cập nhật câu khen ngợi tự động (không bắt chọn submit option)
    const praiseItem = S.find((it) => it.say && it.say.includes("để tớ khen"));
    if (praiseItem && currentProfile.praiseMsg) {
      praiseItem.say = currentProfile.praiseMsg;
    }

    // 3. Cập nhật câu ở chòm sao (heroes)
    const heroItem = S.find(
      (it) => it.say && it.say.includes("không có tên trong sách"),
    );
    if (heroItem) {
      heroItem.say =
        "và còn những người không có tên trong sách: bà, mẹ, chị, cô giáo… và cả <em>" +
        esc(currentProfile.displayName) +
        "</em> nữa";
    }

    // 4. Cập nhật thiệp kết màn
    const fTo = $("#f-to");
    if (fTo) {
      fTo.textContent =
        "gửi " + currentProfile.displayName + (FROM ? " · từ " + FROM : "");
    }
    const fMsg = $("#sc-final .f-msg");
    if (fMsg && currentProfile.finalMsg) {
      fMsg.innerHTML = currentProfile.finalMsg;
    }
  }

  /* ================= KỊCH BẢN ================= */
  const S = [
    {
      say: TO ? "này <em>" + esc(TO) + "</em> ơi!" : "này cậu ơi!",
      bars: 1.1,
      mood: "wave",
      mode: "hero",
      bg: 0,
      fx: {
        meteor: 1,
      },
    },
    {
      say: "tớ là <em>Nụ</em> ( Đệ của Tuấn Anh ) — nàng tiên nhỏ của vườn hoa",
      bars: 1.7,
      mood: "talk",
    },
    {
      say: "hôm nay tớ được giao một nhiệm vụ đặc biệt lắm đó…",
      bars: 1.7,
      mood: "shy",
    },
    {
      say: "vì hôm nay là…",
      bars: 1,
      mood: "talk",
    },
    {
      scene: "date",
      mode: "side",
      say: "<em>20/10</em> rồi!",
      bars: 1.7,
      mood: "happy",
      bg: 2,
      fx: {
        petals: 0.7,
        meteor: 1,
      },
    },
    {
      scene: "history",
      say: "ngày 20/10/1930, Hội Phụ nữ phản đế Việt Nam ra đời",
      bars: 2,
      mood: "talk",
      reveal: ["h1", "h2"],
    },
    {
      say:
        "đã <em>" +
        YRS +
        "</em> năm trôi qua, và 20/10 thành ngày cả nước dành để tri ân phụ nữ",
      bars: 2.3,
      mood: "talk",
      reveal: ["h3", "h4"],
      on() {
        countTo($("#yrs"), YRS, 2200);
      },
    },
    {
      scene: "heroes",
      say: "trong câu chuyện đất nước, có biết bao người phụ nữ phi thường…",
      bars: 2,
      mood: "talk",
      bg: 0,
      fx: {
        meteor: 1.6,
      },
      reveal: ["n1", "l1", "n2", "l2", "e12"],
    },
    {
      say: "từ Hai Bà Trưng, Bà Triệu thuở dựng nước, đến những người con gái kiên cường của thế kỷ XX",
      bars: 2.4,
      mood: "talk",
      reveal: ["n3", "l3", "e23", "n4", "l4", "e24", "n5", "l5", "e35", "e45"],
    },
    {
      say: "và còn những người không có tên trong sách: bà, mẹ, chị, cô giáo… và cả <em>cậu</em> nữa",
      bars: 2.4,
      mood: "happy",
      reveal: ["n6", "l6", "e46", "e56"],
      fx: {
        meteor: 2.2,
        petals: 0.3,
      },
    },
    {
      scene: "unseen",
      say: "có những điều rất nhỏ mà phụ nữ vẫn lặng lẽ làm mỗi ngày…",
      bars: 2,
      mood: "talk",
      bg: 2,
      fx: {
        petals: 0.2,
      },
    },
    {
      say: "",
      bars: 1.15,
      reveal: ["c1"],
    },
    {
      say: "",
      bars: 1.15,
      reveal: ["c2"],
    },
    {
      say: "",
      bars: 1.15,
      reveal: ["c3"],
    },
    {
      say: "",
      bars: 1.4,
      reveal: ["c4"],
    },
    {
      say: "mà hiếm khi có ai nói lời cảm ơn",
      bars: 1.8,
      mood: "shy",
    },
    {
      scene: "none",
      mode: "hero",
      say: "nên hôm nay, đến lượt <em>cậu</em> được quan tâm",
      bars: 2,
      mood: "happy",
      fx: {
        petals: 1.1,
      },
    },
    {
      say: "tớ xin gửi cậu bốn lời chúc nhé",
      bars: 1.5,
      mood: "wave",
      bg: 2,
    },
    {
      scene: "health",
      mode: "side",
      say: "chúc cậu thật nhiều <em>sức khỏe</em> — để còn đi hết những nơi cậu muốn đến",
      bars: 2.4,
      mood: "talk",
      bg: 1,
      fx: {
        meteor: 0.6,
      },
    },
    {
      scene: "peace",
      say: "chúc cậu <em>bình yên</em> — dù ngoài kia có ồn ào thế nào",
      bars: 2.2,
      mood: "talk",
      bg: 1,
    },
    {
      scene: "free",
      say: "chúc cậu đủ <em>tự do</em> để làm điều mình thích, và đủ dũng cảm để theo đuổi nó",
      bars: 2.5,
      mood: "talk",
      bg: 0,
      fx: {
        lantern: 1,
        meteor: 0.8,
      },
    },
    {
      scene: "love",
      say: "chúc cậu luôn được <em>yêu thương</em> — đúng cách, đúng người, và cả bởi chính cậu",
      bars: 2.5,
      mood: "happy",
      bg: 2,
      fx: {
        hearts: 1,
        petals: 0.3,
      },
    },
    {
      scene: "none",
      mode: "hero",
      say: "cậu không cần phải hoàn hảo đâu",
      bars: 1.6,
      mood: "talk",
      fx: {
        petals: 0.8,
      },
    },
    {
      say: "cậu đẹp ở cách cậu cố gắng, cách cậu cười, và cách cậu thương người khác",
      bars: 2.4,
      mood: "shy",
    },
    {
      scene: "gift",
      mode: "side",
      say: "tớ tặng cậu bó hoa này nè",
      bars: 1.8,
      mood: "happy",
      bg: 3,
      fx: {
        petals: 1,
        meadow: 1.1,
      },
    },
    {
      say: "một loài hoa không bao giờ héo — vì mỗi cánh là một lời yêu thương",
      bars: 2.4,
      mood: "talk",
    },
    {
      scene: "question",
      mode: "hero",
      say: "cho tớ hỏi một câu thôi nhé…<br>hôm nay cậu đã <em>khen bản thân</em> chưa?",
      bars: 2.2,
      mood: "wink",
      bg: 2,
      fx: {
        petals: 0.3,
        meteor: 1,
      },
    },
    {
      say: "để tớ khen nhé: cậu luôn <em>mạnh mẽ</em>, <em>dịu dàng</em> và <em>xứng đáng</em> được yêu thương thật nhiều!",
      bars: 2.8,
      mood: "happy",
    },
    {
      scene: "final",
      mode: "side",
      say: "",
      mood: "happy",
      bg: 3,
      fx: {
        fire: 1,
        petals: 0.9,
        meadow: 1.5,
      },
      wait: true,
      final: true,
    },
  ];

  /* ================= TRẠNG THÁI ================= */
  const nu = $("#nu"),
    bgls = $$(".bgl"),
    line = $("#line"),
    bubble = $("#bubble"),
    hint = $("#hint"),
    prog = $("#prog");
  let idx = -1,
    timer = null,
    started = false,
    curScene = null,
    waiting = false,
    lock = 0,
    talkT = null;
  let fxS = {
    petals: 0,
    hearts: 0,
    lantern: 0,
    fire: 0,
    meteor: 1,
    meadow: 0.6,
  };

  function mood(m) {
    nu.className = m || "";
  }
  function talk(on) {
    clearTimeout(talkT);
    nu.classList.toggle("talk", on);
    if (on) talkT = setTimeout(() => nu.classList.remove("talk"), 1500);
  }

  function say(html) {
    bubble.classList.toggle("empty", !html);
    line.innerHTML = html || "";
    let k = 0;
    (function walk(n) {
      [...n.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (!p.trim()) {
              f.append(p);
              return;
            }
            const s = document.createElement("span");
            s.className = "w";
            s.textContent = p;
            s.style.animationDelay = k++ * 65 + "ms";
            f.append(s);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
      });
    })(line);
  }

  function showScene(name) {
    if (name === undefined) return;
    const next = name === "none" ? null : $("#sc-" + name);
    if (next === curScene) return;
    if (curScene) {
      curScene.classList.remove("on");
    }
    const old = curScene;
    curScene = next;
    if (old)
      setTimeout(() => {
        if (old !== curScene)
          $$(".rv.on,.node.on,.edge.on,.lbl.on", old).forEach((e) =>
            e.classList.remove("on"),
          );
      }, 800);
    if (next)
      setTimeout(
        () => {
          if (curScene === next) next.classList.add("on");
        },
        old ? 420 : 60,
      );
  }

  function countTo(el, to, ms) {
    const t0 = performance.now();
    (function f(t) {
      const k = Math.min(1, (t - t0) / ms);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }

  function go(n) {
    clearTimeout(timer);
    if (n >= S.length) return;
    idx = n;
    const st = S[n];
    document.body.classList.toggle("bloom", !!st.final);
    if (st.mode) {
      document.body.classList.toggle("m-side", st.mode === "side");
      document.body.classList.toggle("m-hero", st.mode === "hero");
    }
    if (st.bg !== undefined)
      bgls.forEach((e, k) => e.classList.toggle("on", k === st.bg));
    if (st.fx) {
      fxS = Object.assign(
        {
          petals: 0,
          hearts: 0,
          lantern: 0,
          fire: 0,
          meteor: 1,
          meadow: 0.6,
        },
        st.fx,
      );
      parts.forEach((p) => {
        if (
          (p.t === "lantern" && !fxS.lantern) ||
          (p.t === "heart" && !fxS.hearts)
        )
          p.kill = true;
      });
    }
    showScene(st.scene);
    if (st.mood !== undefined) {
      const talking = nu.classList.contains("talk");
      mood(st.mood);
      if (talking) nu.classList.add("talk");
    }
    say(st.say);
    talk(!!st.say);
    if (st.reveal)
      st.reveal.forEach((id, j) =>
        setTimeout(
          () => {
            const e = document.getElementById(id);
            if (e) e.classList.add("on");
          },
          (st.scene ? 650 : 0) + j * 260,
        ),
      );
    if (st.on) st.on();
    prog.style.width = ((n + 1) / S.length) * 100 + "%";
    hint.classList.toggle("on", n >= 1 && n <= 4);
    waiting = !!st.wait;
    if (!st.wait && !qp.has("hold"))
      timer = setTimeout(() => go(n + 1), snap((st.bars || 1.5) * BAR));
    if (st.final) setupFinal();
  }

  function next() {
    const now = Date.now();
    if (now - lock < 220) return;
    lock = now;
    if (!waiting && idx < S.length - 1) go(idx + 1);
  }

  /* ================= TƯƠNG TÁC ================= */
  document.addEventListener("click", (e) => {
    if (!started) return;
    if (e.target.closest(".ui,button,input,a,.final")) return;
    next();
  });
  document.addEventListener("keydown", (e) => {
    if (
      started &&
      (e.key === " " || e.key === "ArrowRight") &&
      e.target.tagName !== "INPUT"
    ) {
      e.preventDefault();
      next();
    }
  });

  const q1Btn = $("#q1");
  if (q1Btn) {
    q1Btn.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b || !waiting) return;
      waiting = false;
      q1Btn.classList.remove("on");
      mood("happy");
      talk(true);
      if (b.dataset.a === "yes") {
        say("giỏi quá! cứ khen thật nhiều vào nhé — cậu xứng đáng mà");
      } else {
        say(
          "vậy để tớ khen giúp: cậu <em>mạnh mẽ</em> hơn cậu nghĩ, <em>dịu dàng</em> hơn cậu tưởng, và quan trọng hơn cậu vẫn nghĩ rất nhiều",
        );
      }
      clearTimeout(timer);
      timer = setTimeout(() => go(idx + 1), snap(4.4 * BAR));
    });
  }

  function setupFinal() {
    const to = currentProfile ? currentProfile.displayName : TO || "";
    $("#f-to").textContent = to
      ? "gửi " + to + (FROM ? " · từ " + FROM : "")
      : "gửi người phụ nữ tuyệt vời" + (FROM ? " · từ " + FROM : "");
    if (currentProfile && currentProfile.finalMsg) {
      const fMsg = $("#sc-final .f-msg");
      if (fMsg) fMsg.innerHTML = currentProfile.finalMsg;
    }
    if (location.protocol.startsWith("http")) $("#b-link").hidden = false;
  }
  $("#b-link").addEventListener("click", () => {
    const v = currentProfile ? currentProfile.displayName : TO;
    const u = new URL(location.href);
    u.search = "";
    if (v) u.searchParams.set("to", v);
    (navigator.clipboard
      ? navigator.clipboard.writeText(u.toString())
      : Promise.reject()
    )
      .then(() => {
        $("#b-link").textContent = "đã chép ✓";
        setTimeout(() => ($("#b-link").textContent = "chép link"), 1800);
      })
      .catch(() => prompt("Sao chép liên kết:", u.toString()));
  });
  $("#b-replay").addEventListener("click", () => {
    $$(".rv.on,.node.on,.edge.on,.lbl.on").forEach((e) =>
      e.classList.remove("on"),
    );
    if (curScene) {
      curScene.classList.remove("on");
      curScene = null;
    }
    setTimeout(() => go(0), 300);
  });

  /* ================= ÂM THANH ================= */
  const bgm = $("#bgm");
  let actx = null,
    an = null,
    fd = null,
    avg = 0,
    dpeak = 0.02;
  function setupAudio() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      actx = new AC();
      const src = actx.createMediaElementSource(bgm);
      an = actx.createAnalyser();
      an.fftSize = 256;
      an.smoothingTimeConstant = 0.55;
      src.connect(an);
      an.connect(actx.destination);
      fd = new Uint8Array(an.frequencyBinCount);
      if (actx.state === "suspended") actx.resume();
    } catch (err) {
      an = null;
    }
  }
  $("#mute").addEventListener("click", () => {
    bgm.muted = !bgm.muted;
    $("#mute").classList.toggle("muted", bgm.muted);
  });

  function startGiftExperience(enteredName) {
    if (started) return;
    started = true;
    applyProfile(enteredName);
    $("#start").classList.add("gone");
    setupAudio();
    bgm.volume = 0.9;
    const pr = bgm.play();
    if (pr && pr.catch) pr.catch(() => {});

    // Kích hoạt hiệu ứng canvas fx mở màn (trong js/canvas-fx.js)
    const startEl = $("#start");
    if (startEl) {
      startEl.click();
    }

    setTimeout(() => go(0), 500);
  }

  const nameInput = $("#name-input");
  const btnSubmit = $("#btn-submit-name");
  const nameBox = $("#name-box");

  if (TO && nameInput) {
    nameInput.value = TO;
  }

  if (btnSubmit) {
    btnSubmit.addEventListener("click", (e) => {
      e.stopPropagation();
      const val = nameInput ? nameInput.value.trim() : "";
      startGiftExperience(val);
    });
  }

  if (nameInput) {
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        const val = nameInput.value.trim();
        startGiftExperience(val);
      }
    });
  }

  if (nameBox) {
    nameBox.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Click vào vùng trống nền sẽ rung nhẹ hộp nhập tên
  $("#start").addEventListener("click", (e) => {
    if (started) return;
    if (e.target.closest("#name-box")) return;
    if (nameBox) {
      nameBox.classList.add("nudge");
      setTimeout(() => nameBox.classList.remove("nudge"), 600);
    }
    if (nameInput) {
      nameInput.focus();
    }
  });

  /* ================= HIỆU ỨNG NỀN (canvas) ================= */
  const cv = $("#fx"),
    ctx = cv.getContext("2d");
  let W = 0,
    H = 0,
    DPR = 1,
    stars = [],
    parts = [],
    pulse = 0,
    lastP = -1,
    acc = {
      p: 0,
      h: 0,
      l: 0,
      f: 0,
      m: 0,
    };

  function spr(w, h, fn) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    fn(c.getContext("2d"), w, h);
    return c;
  }
  function petalSpr(c1, c2) {
    return spr(40, 56, (g, w, h) => {
      const gr = g.createLinearGradient(0, h, 0, 0);
      gr.addColorStop(0, c1);
      gr.addColorStop(1, c2);
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(w / 2, h * 0.96);
      g.bezierCurveTo(-w * 0.25, h * 0.62, w * 0.08, h * 0.02, w / 2, 0);
      g.bezierCurveTo(w * 0.92, h * 0.02, w * 1.25, h * 0.62, w / 2, h * 0.96);
      g.fill();
    });
  }
  const SP = {
    petal: [
      petalSpr("#ff7ab8", "#ffe3f0"),
      petalSpr("#ffb347", "#fff0c4"),
      petalSpr("#9b6bff", "#eadfff"),
    ],
    heart: spr(48, 44, (g, w, h) => {
      const gr = g.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, "#ffc2dd");
      gr.addColorStop(1, "#ff5f9a");
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(w / 2, h * 0.95);
      g.bezierCurveTo(-w * 0.2, h * 0.55, w * 0.12, -h * 0.1, w / 2, h * 0.28);
      g.bezierCurveTo(w * 0.88, -h * 0.1, w * 1.2, h * 0.55, w / 2, h * 0.95);
      g.fill();
    }),
    lantern: spr(64, 84, (g, w, h) => {
      const r = g.createRadialGradient(
        w / 2,
        h * 0.5,
        2,
        w / 2,
        h * 0.5,
        w / 2,
      );
      r.addColorStop(0, "rgba(255,200,120,.7)");
      r.addColorStop(1, "rgba(255,160,90,0)");
      g.fillStyle = r;
      g.fillRect(0, 0, w, h);
      const gr = g.createLinearGradient(0, h * 0.25, 0, h * 0.75);
      gr.addColorStop(0, "#fff0b8");
      gr.addColorStop(1, "#ff9a58");
      g.fillStyle = gr;
      g.beginPath();
      g.moveTo(w * 0.34, h * 0.24);
      g.quadraticCurveTo(w * 0.14, h * 0.5, w * 0.3, h * 0.74);
      g.lineTo(w * 0.7, h * 0.74);
      g.quadraticCurveTo(w * 0.86, h * 0.5, w * 0.66, h * 0.24);
      g.closePath();
      g.fill();
      g.fillStyle = "#ffd9a0";
      g.fillRect(w * 0.32, h * 0.2, w * 0.36, h * 0.05);
      g.fillStyle = "#e07a3c";
      g.fillRect(w * 0.32, h * 0.74, w * 0.36, h * 0.04);
      g.strokeStyle = "rgba(180,70,20,.35)";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(w * 0.5, h * 0.25);
      g.lineTo(w * 0.5, h * 0.74);
      g.stroke();
    }),
  };

  function resize() {
    DPR = Math.min(devicePixelRatio || 1, innerWidth <= 768 ? 1 : 1.5);
    W = innerWidth;
    H = innerHeight;
    cv.width = W * DPR;
    cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const isMobile = innerWidth <= 768;
    const n = Math.min(
      isMobile ? 100 : 230,
      Math.round((W * H) / (isMobile ? 10000 : 6500)),
    );
    stars = [];
    for (let i = 0; i < n; i++)
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.4,
        t: Math.random() * 6.28,
        s: 0.6 + Math.random() * 1.6,
        h: Math.random() < 0.2 ? 330 : Math.random() < 0.4 ? 210 : 45,
      });
  }
  addEventListener("resize", resize);
  resize();
  let mdw = 0.6;
  const BL = [];
  function blades() {
    BL.length = 0;
    const n = Math.round(W / (innerWidth <= 768 ? 8 : 5));
    for (let i = 0; i < n; i++)
      BL.push({
        x: (i / n) * W + Math.random() * 4,
        h:
          (0.04 + Math.random() * 0.08) *
          H *
          (0.55 + 0.9 * Math.pow(Math.sin((i / n) * 9 + 1), 2)),
        ph: Math.random() * 6.28,
        w: 1 + Math.random() * 1.2,
        hue: [160, 175, 190, 95, 55, 320][(Math.random() * 6) | 0],
      });
  }
  blades();
  addEventListener("resize", blades);

  function spawn(type) {
    const R = Math.random;
    if (type === "petal")
      parts.push({
        t: "petal",
        x: R() * W,
        y: -30,
        vx: -10 + R() * 30,
        vy: 40 + R() * 55,
        r: R() * 6.28,
        vr: (R() - 0.5) * 3,
        s: 0.35 + R() * 0.45,
        ph: R() * 6.28,
        sp: SP.petal[(R() * 3) | 0],
        a: 1,
      });
    else if (type === "heart")
      parts.push({
        t: "heart",
        x: R() * W,
        y: H + 20,
        vx: (R() - 0.5) * 30,
        vy: -(50 + R() * 60),
        r: 0,
        vr: 0,
        s: 0.25 + R() * 0.45,
        ph: R() * 6.28,
        sp: SP.heart,
        a: 0.9,
      });
    else if (type === "lantern")
      parts.push({
        t: "lantern",
        x: R() * W,
        y: H + 50,
        vx: (R() - 0.5) * 14,
        vy: -(24 + R() * 28),
        r: 0,
        vr: 0,
        s: 0.5 + R() * 0.7,
        ph: R() * 6.28,
        sp: SP.lantern,
        a: 0.95,
      });
    else if (type === "meteor") {
      const x = W * (0.3 + R() * 0.7),
        y = R() * H * 0.35;
      parts.push({
        t: "meteor",
        x,
        y,
        vx: -(380 + R() * 220),
        vy: 150 + R() * 100,
        life: 1,
      });
    } else if (type === "fire") {
      const cx = W * (0.15 + R() * 0.7),
        cy = H * (0.12 + R() * 0.4),
        hue = [330, 45, 280, 200][(R() * 4) | 0],
        n = 34;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 6.283 + R() * 0.2,
          v = 90 + R() * 120;
        parts.push({
          t: "spark",
          x: cx,
          y: cy,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
          hue,
        });
      }
    }
  }

  let lastT = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    /* nhịp bass → pulse */
    let target = 0;
    if (an && fd && !bgm.paused) {
      an.getByteFrequencyData(fd);
      const lvl = (fd[0] + fd[1] + fd[2] + fd[3]) / (4 * 255);
      avg += (lvl - avg) * Math.min(1, dt * 3.2);
      const d = lvl - avg;
      dpeak = Math.max(dpeak * Math.pow(0.6, dt), d, 0.02);
      target = Math.min(1, Math.max(0, d / dpeak));
      target *= target;
    } else if (started) {
      {
        const bp = BEAT / 1000;
        target = Math.max(0, 1 - (((now / 1000) % bp) / bp) * 3);
      }
    }
    if (!bgm.paused) {
      const ph =
        ((((bgm.currentTime * 1000 - OFF) % BEAT) + BEAT) % BEAT) / BEAT;
      target = Math.max(target, Math.pow(Math.max(0, 1 - ph * 2.4), 2) * 0.65);
    }
    pulse = Math.max(pulse * Math.pow(0.02, dt), target);
    if (pulse > 1) pulse = 1;
    if (Math.abs(pulse - lastP) > 0.03) {
      lastP = pulse;
      document.documentElement.style.setProperty("--p", pulse.toFixed(2));
    }

    ctx.clearRect(0, 0, W, H);
    /* sao */
    for (const s of stars) {
      s.t += dt * s.s;
      const a = 0.35 + 0.45 * Math.abs(Math.sin(s.t)) + pulse * 0.25;
      ctx.globalAlpha = Math.min(1, a);
      ctx.fillStyle = "hsl(" + s.h + ",90%,88%)";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * (1 + pulse * 0.35), 0, 6.283);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    /* đồng cỏ neon */
    mdw += (fxS.meadow - mdw) * Math.min(1, dt * 1.6);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    const tm = now / 1000;
    for (const b of BL) {
      const sw =
          Math.sin(tm * 1.2 + b.ph + b.x * 0.004) * (5 + b.h * 0.12) +
          Math.sin(tm * 0.5 + b.x * 0.01) * 4,
        h = b.h * mdw;
      ctx.strokeStyle =
        "hsla(" + b.hue + ",95%,60%," + (0.5 + pulse * 0.35) + ")";
      ctx.lineWidth = b.w;
      ctx.beginPath();
      ctx.moveTo(b.x, H);
      ctx.quadraticCurveTo(b.x + sw * 0.3, H - h * 0.6, b.x + sw, H - h);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
    /* sinh hạt */
    acc.p += dt * fxS.petals * 7;
    while (acc.p >= 1) {
      acc.p--;
      spawn("petal");
    }
    acc.h += dt * fxS.hearts * 4;
    while (acc.h >= 1) {
      acc.h--;
      spawn("heart");
    }
    acc.l += dt * fxS.lantern * 1.5;
    while (acc.l >= 1) {
      acc.l--;
      spawn("lantern");
    }
    acc.f += dt * fxS.fire * 1.1;
    while (acc.f >= 1) {
      acc.f--;
      spawn("fire");
    }
    acc.m += dt * fxS.meteor * 0.22;
    while (acc.m >= 1) {
      acc.m--;
      spawn("meteor");
    }
    if (parts.length > 420) parts.splice(0, parts.length - 420);
    /* vẽ hạt */
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      if (p.t === "meteor") {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 1.1;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        const g = ctx.createLinearGradient(
          p.x,
          p.y,
          p.x - p.vx * 0.16,
          p.y - p.vy * 0.16,
        );
        g.addColorStop(0, "rgba(255,255,255," + p.life + ")");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 0.16, p.y - p.vy * 0.16);
        ctx.stroke();
        continue;
      }
      if (p.t === "spark") {
        p.vy += 90 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.985;
        p.life -= dt * 0.75;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = "hsl(" + p.hue + ",100%,70%)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, 6.283);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        continue;
      }
      if (p.kill) {
        p.a -= dt * 0.9;
        if (p.a <= 0) {
          parts.splice(i, 1);
          continue;
        }
      }
      p.ph += dt * 2;
      p.x += (p.vx + Math.sin(p.ph) * 22) * dt;
      p.y += p.vy * dt;
      p.r += p.vr * dt;
      if (p.y > H + 60 || p.y < -90) {
        parts.splice(i, 1);
        continue;
      }
      const sc = p.s * (1 + (p.t === "heart" ? pulse * 0.12 : 0)),
        w = p.sp.width * sc,
        h = p.sp.height * sc;
      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      if (p.t === "petal") ctx.scale(Math.abs(Math.cos(p.ph)) * 0.7 + 0.3, 1);
      ctx.drawImage(p.sp, -w / 2, -h / 2, w, h);
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  if (qp.has("debug")) window.__go = go;
  document.addEventListener("visibilitychange", () => {
    if (started && !document.hidden && bgm.paused && !bgm.muted)
      bgm.play().catch(() => {});
  });
})();
