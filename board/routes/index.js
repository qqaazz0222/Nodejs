const express = require("express");
const session = require("express-session");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");
const sessionStore = require("../db/session");

router.use(
    session({
        secret: "sessionkey",
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

router.get("/", async (req, res) => {
    try {
        const books = await pool.query("SELECT * FROM books");
        if (req.session.uid) {
            res.render("index", {
                books: books[0],
                num: books[0].length,
                signinStatus: true,
            });
        } else {
            res.render("index", {
                books: books[0],
                num: books[0].length,
                signinStatus: false,
            });
        }
    } catch (error) {
        return res.redirect("/");
    }
    // [수정] connection -> pool 변경
    // connection.query("SELECT * FROM books;", (err1, res1, fld1) => {
    //     try {
    //         if (req.session.uid) {
    //             res.render("index", {
    //                 books: res1,
    //                 num: res1.length,
    //                 signinStatus: true,
    //             });
    //         } else {
    //             res.render("index", {
    //                 books: res1,
    //                 num: res1.length,
    //                 signinStatus: false,
    //             });
    //         }
    //     } catch (err1) {
    //         throw err1;
    //     }
    // });
});

router.get("/book/:id", async (req, res) => {
    try {
        if (req.session.uid) {
            const book = await pool.query("SELECT * FROM books WHERE id=?", [
                req.params.id,
            ]);
            res.render("book", {
                bookid: req.params.id,
                book: book[0][0],
                signinStatus: true,
            });
        } else {
            res.send(
                "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
            );
        }
    } catch (error) {
        return res.redirect("/");
    }
    // [수정] connection -> pool 변경
    // if (req.session.uid) {
    //     connection.query(
    //         "SELECT * FROM books WHERE id=?;",
    //         [req.params.id],
    //         (err1, res1, fld1) => {
    //             try {
    //                 res.render("book", {
    //                     bookid: req.params.id,
    //                     book: res1[0],
    //                     signinStatus: true,
    //                 });
    //             } catch (err1) {
    //                 throw err1;
    //             }
    //         }
    //     );
    // } else {
    //     res.send(
    //         "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
    //     );
    // }
});

router.get("/test", async (req, res) => {
    let name = [
        "트렌드 코리아 2023 ",
        "아버지의 해방일지",
        "헤어질 결심 스토리보드북",
        "불편한 편의점 2",
        "올리버쌤의 미국식 아이 영어 습관 365",
        "역행자",
        "하얼빈",
        "불편한 편의점",
        "세상에서 가장 쉬운 본질육아 ",
        "시니맘의 오늘도 완밥 유아식 ",
        "파친코 2",
        "파친코 1",
        "단순한 열정",
        "부자 아빠 가난한 아빠 20주년 특별 기념판",
        "흔한남매의 흔한 호기심 7",
        "해커스 GSAT 삼성직무적성검사 실전모의고사 8회분",
        "세상의 마지막 기차역",
        "원씽 THE ONE THING",
        "그릿 Grit : 100쇄 기념 리커버 에디션",
        "사람을 얻는 지혜",
        "작은 땅의 야수들",
        "퀀트 투자 무작정 따라하기",
        "데일 카네기 인간관계론",
        "마흔에 읽는 니체",
        "잘될 수밖에 없는 너에게",
        "저스트.킵.바잉.",
        "마지막 이야기 전달자",
        "2023 써니 행정법총론 기출문제집",
        "가녀장의 시대",
        "설민석의 한국사 대모험 22",
        "나의 투자는 새벽 4시에 시작된다",
        "2022 큰별쌤 최태성의 별별한국사 기출 500제 한국사능력검정시험 심화",
        "위풍당당 여우 꼬리 3",
        "ETS 토익 정기시험 기출문제집 1000 Vol.3 READING 리딩 ",
        "돈의 속성 200쇄 리커버",
        "10배의 법칙",
        "ETS 토익 정기시험 기출문제집 1000 Vol.3 LISTENING 리스닝  ",
        "엄마의 말 연습 ",
        "긴긴밤",
        "데일 카네기 자기관리론",
        "어서 오세요, 휴남동서점입니다",
        "해커스 토익 기출  VOCA 보카",
        "2022 큰별쌤 최태성의 별별한국사 한국사능력검정시험 심화(1, 2, 3급) 상",
        "부자의 그릇",
        "이토록 평범한 미래",
        "보이지 않는 곳에서 애쓰고 있는 너에게",
        "마음세탁소",
        "작별인사",
        "참괜찮은 태도",
        "나는 오래된 거리처럼 너를 사랑하고",
        "물고기는 존재하지 않는다",
        "부의 추월차선 (10주년 스페셜 에디션)",
        "흔한남매 11",
        "2022 큰별쌤 최태성의 별별한국사 한국사능력검정시험 심화(1, 2, 3급) 하",
        "외사랑",
        "해커스 GSAT 삼성직무적성검사 FINAL 봉투모의고사 4회분(수리논리/추리)",
        "푸른 사자 와니니 4",
        "나는 당신이 행복했으면 좋겠습니다",
        "흔한남매 수수께끼 어드벤처 1",
        "오늘 밤, 세계에서 이 사랑이 사라진다 해도",
        "푸른 사자 와니니 5",
        "헤어질 결심 각본",
        "타이탄의 도구들 (블랙 에디션)",
        "숲속의 담 5 ",
        "어느 날, 내 죽음에 네가 들어왔다 ",
        "이어령의 마지막 수업",
        "최소한의 이웃",
        "오은영의 화해",
        "클루지",
        "나의 아름다운 할머니",
        "이 책은 돈 버는 법에 관한이야기 ",
        "설민석의 세계사 대모험 14",
        "난중일기",
        "종이 동물원",
        "빠르게 실패하기",
        "예쁘게 말하는 네가 좋다 ",
        "마이클 모부신 운과 실력의 성공 방정식",
        "SQL 자격검정 실전문제",
        "레버리지",
        "달러구트 꿈 백화점 (레인보우 에디션)",
    ];
    let price = [
        "19,000원",
        "15,000원",
        "33,000원",
        "14,000원",
        "23,000원",
        "17,500원",
        "16,000원",
        "14,000원",
        "18,800원",
        "19,500원",
        "15,800원",
        "15,800원",
        "10,000원",
        "15,800원",
        "14,000원",
        "17,900원",
        "14,000원",
        "14,000원",
        "16,000원",
        "13,800원",
        "18,000원",
        "25,000원",
        "11,500원",
        "16,000원",
        "16,000원",
        "19,800원",
        "18,000원",
        "42,000원",
        "15,000원",
        "13,000원",
        "19,800원",
        "19,500원",
        "13,000원",
        "17,800원",
        "17,800원",
        "16,800원",
        "17,800원",
        "17,500원",
        "11,500원",
        "11,500원",
        "15,000원",
        "12,900원",
        "15,000원",
        "15,000원",
        "14,000원",
        "10,800원",
        "15,000원",
        "14,000원",
        "16,800원",
        "12,000원",
        "17,000원",
        "17,500원",
        "14,500원",
        "14,500원",
        "17,800원",
        "14,900원",
        "12,000원",
        "13,800원",
        "14,000원",
        "14,000원",
        "12,000원",
        "15,000원",
        "18,000원",
        "15,000원",
        "15,000원",
        "16,500원",
        "15,800원",
        "16,000원",
        "13,800원",
        "13,000원",
        "16,800원",
        "13,000원",
        "15,000원",
        "15,800원",
        "16,500원",
        "15,800원",
        "18,000원",
        "18,000원",
        "16,000원",
        "13,800원",
    ];
    let discprice = [
        "17,100원",
        "13,500원",
        "29,700원",
        "12,600원",
        "20,700원",
        "15,750원",
        "14,400원",
        "12,600원",
        "16,920원",
        "17,550원",
        "14,220원",
        "14,220원",
        "9,000원",
        "14,220원",
        "12,600원",
        "16,110원",
        "12,600원",
        "12,600원",
        "14,400원",
        "12,420원",
        "16,200원",
        "22,500원",
        "10,350원",
        "14,400원",
        "14,400원",
        "17,820원",
        "16,200원",
        "37,800원",
        "13,500원",
        "11,700원",
        "17,820원",
        "17,550원",
        "11,700원",
        "16,020원",
        "16,020원",
        "15,120원",
        "16,020원",
        "15,750원",
        "10,350원",
        "10,350원",
        "13,500원",
        "11,610원",
        "13,500원",
        "13,500원",
        "12,600원",
        "9,720원",
        "13,500원",
        "12,600원",
        "15,120원",
        "10,800원",
        "15,300원",
        "15,750원",
        "13,050원",
        "13,050원",
        "16,020원",
        "13,410원",
        "10,800원",
        "12,420원",
        "12,600원",
        "12,600원",
        "10,800원",
        "13,500원",
        "16,200원",
        "13,500원",
        "13,500원",
        "14,850원",
        "14,220원",
        "14,400원",
        "12,420원",
        "11,700원",
        "15,120원",
        "11,700원",
        "13,500원",
        "14,220원",
        "14,850원",
        "14,220원",
        "16,200원",
        "17,820원",
        "14,400원",
        "12,420원",
    ];

    try {
        for (i = 0; i < 80; i++) {
            let t_name = name[i];
            let t_price = price[i];
            t_price = t_price.replace(",", "");
            t_price = t_price.replace("원", "");
            let t_discprice = discprice[i];
            t_discprice = t_discprice.replace(",", "");
            t_discprice = t_discprice.replace("원", "");

            console.log(name[i], price[i], discprice[i]);
            let book = await pool.query(
                "INSERT INTO book VALUES(null, ?, ?, ?);",
                [t_name, parseInt(t_price), parseInt(t_discprice)]
            );
        }
        return res.redirect("/");
    } catch (error) {
        return res.redirect("/");
    }
});
module.exports = router;
