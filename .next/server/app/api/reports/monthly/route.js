/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/reports/monthly/route";
exports.ids = ["app/api/reports/monthly/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.username || !credentials?.password) {\n                    throw new Error(\"Please provide username and password\");\n                }\n                await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                    username: credentials.username\n                });\n                if (!user) {\n                    throw new Error(\"Invalid username or password\");\n                }\n                const isPasswordValid = await user.comparePassword(credentials.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid username or password\");\n                }\n                return {\n                    id: user._id.toString(),\n                    name: user.name,\n                    username: user.username,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.username = user.username;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.username = token.username;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwRDtBQUNPO0FBQzVCO0FBQ0w7QUFFekIsTUFBTUksY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLFVBQVU7b0JBQUVDLE9BQU87b0JBQVlDLE1BQU07Z0JBQU87Z0JBQzVDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxZQUFZLENBQUNELGFBQWFJLFVBQVU7b0JBQ3BELE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTVgsd0RBQVNBO2dCQUVmLE1BQU1ZLE9BQU8sTUFBTVgsb0RBQUlBLENBQUNZLE9BQU8sQ0FBQztvQkFBRVAsVUFBVUQsWUFBWUMsUUFBUTtnQkFBQztnQkFFakUsSUFBSSxDQUFDTSxNQUFNO29CQUNULE1BQU0sSUFBSUQsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUcsa0JBQWtCLE1BQU1GLEtBQUtHLGVBQWUsQ0FBQ1YsWUFBWUksUUFBUTtnQkFFdkUsSUFBSSxDQUFDSyxpQkFBaUI7b0JBQ3BCLE1BQU0sSUFBSUgsTUFBTTtnQkFDbEI7Z0JBRUEsT0FBTztvQkFDTEssSUFBSUosS0FBS0ssR0FBRyxDQUFDQyxRQUFRO29CQUNyQmQsTUFBTVEsS0FBS1IsSUFBSTtvQkFDZkUsVUFBVU0sS0FBS04sUUFBUTtvQkFDdkJhLE1BQU1QLEtBQUtPLElBQUk7Z0JBQ2pCO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRVYsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JVLE1BQU1OLEVBQUUsR0FBR0osS0FBS0ksRUFBRTtnQkFDbEJNLE1BQU1oQixRQUFRLEdBQUdNLEtBQUtOLFFBQVE7Z0JBQzlCZ0IsTUFBTUgsSUFBSSxHQUFHUCxLQUFLTyxJQUFJO1lBQ3hCO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEMsUUFBUVgsSUFBSSxDQUFDSSxFQUFFLEdBQUdNLE1BQU1OLEVBQUU7Z0JBQzFCTyxRQUFRWCxJQUFJLENBQUNOLFFBQVEsR0FBR2dCLE1BQU1oQixRQUFRO2dCQUN0Q2lCLFFBQVFYLElBQUksQ0FBQ08sSUFBSSxHQUFHRyxNQUFNSCxJQUFJO1lBQ2hDO1lBQ0EsT0FBT0k7UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FGLFNBQVM7UUFDUEcsVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDO0FBRUQsTUFBTUMsVUFBVWxDLGdEQUFRQSxDQUFDSTtBQUVpQiIsInNvdXJjZXMiOlsiRDpcXFVBUyBTb2Z0ZGV2XFxzYXZvcnlfYmFuYW5hc1xcYXBwXFxhcGlcXGF1dGhcXFsuLi5uZXh0YXV0aF1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyB0eXBlIE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXHJcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSBcIkAvbGliL21vbmdvZGJcIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiQC9tb2RlbHMvVXNlclwiXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgdXNlcm5hbWU6IHsgbGFiZWw6IFwiVXNlcm5hbWVcIiwgdHlwZTogXCJ0ZXh0XCIgfSxcclxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8udXNlcm5hbWUgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHByb3ZpZGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCBkYkNvbm5lY3QoKVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IGNyZWRlbnRpYWxzLnVzZXJuYW1lIH0pXHJcblxyXG4gICAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgdXNlci5jb21wYXJlUGFzc3dvcmQoY3JlZGVudGlhbHMucGFzc3dvcmQpXHJcblxyXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgaWQ6IHVzZXIuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxyXG4gICAgICAgIHRva2VuLnVzZXJuYW1lID0gdXNlci51c2VybmFtZVxyXG4gICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGVcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW5cclxuICAgIH0sXHJcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIudXNlcm5hbWUgPSB0b2tlbi51c2VybmFtZSBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlc3Npb25cclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxyXG4gIH0sXHJcbiAgc2Vzc2lvbjoge1xyXG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXHJcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkYXlzXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxufVxyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJkYkNvbm5lY3QiLCJVc2VyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJ1c2VybmFtZSIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZE9uZSIsImlzUGFzc3dvcmRWYWxpZCIsImNvbXBhcmVQYXNzd29yZCIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJyb2xlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzZXNzaW9uIiwicGFnZXMiLCJzaWduSW4iLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/reports/monthly/route.ts":
/*!******************************************!*\
  !*** ./app/api/reports/monthly/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_Order__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/Order */ \"(rsc)/./models/Order.ts\");\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // 🔁 Update: Admin & Owner diizinkan\n        const allowedRoles = [\n            \"admin\",\n            \"owner\"\n        ];\n        if (!allowedRoles.includes(session.user.role)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Forbidden\"\n            }, {\n                status: 403\n            });\n        }\n        const { searchParams } = new URL(request.url);\n        const year = searchParams.get(\"year\") || new Date().getFullYear().toString();\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);\n        const endDate = new Date(`${Number.parseInt(year) + 1}-01-01T00:00:00.000Z`);\n        const orders = await _models_Order__WEBPACK_IMPORTED_MODULE_3__[\"default\"].find({\n            createdAt: {\n                $gte: startDate,\n                $lt: endDate\n            }\n        }).sort({\n            createdAt: 1\n        });\n        const monthlyData = {};\n        const months = [\n            \"January\",\n            \"February\",\n            \"March\",\n            \"April\",\n            \"May\",\n            \"June\",\n            \"July\",\n            \"August\",\n            \"September\",\n            \"October\",\n            \"November\",\n            \"December\"\n        ];\n        months.forEach((month)=>{\n            monthlyData[month] = {\n                month,\n                totalSales: 0,\n                totalOrders: 0,\n                averageOrderValue: 0\n            };\n        });\n        orders.forEach((order)=>{\n            const month = months[new Date(order.createdAt).getMonth()];\n            monthlyData[month].totalSales += order.totalPrice;\n            monthlyData[month].totalOrders += 1;\n        });\n        Object.keys(monthlyData).forEach((month)=>{\n            if (monthlyData[month].totalOrders > 0) {\n                monthlyData[month].averageOrderValue = monthlyData[month].totalSales / monthlyData[month].totalOrders;\n            }\n        });\n        const result = Object.values(monthlyData);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (error) {\n        console.error(\"Error fetching reports:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to fetch reports\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlcG9ydHMvbW9udGhseS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEM7QUFDTztBQUNaO0FBQ0g7QUFDMEI7QUFFckQsZUFBZUssSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTU4sZ0VBQWdCQSxDQUFDRyw2REFBV0E7UUFFbEQsSUFBSSxDQUFDRyxTQUFTO1lBQ1osT0FBT1AscURBQVlBLENBQUNRLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLHFDQUFxQztRQUNyQyxNQUFNQyxlQUFlO1lBQUM7WUFBUztTQUFRO1FBQ3ZDLElBQUksQ0FBQ0EsYUFBYUMsUUFBUSxDQUFDTCxRQUFRTSxJQUFJLENBQUNDLElBQUksR0FBRztZQUM3QyxPQUFPZCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQVksR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ2pFO1FBRUEsTUFBTSxFQUFFSyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJVixRQUFRVyxHQUFHO1FBQzVDLE1BQU1DLE9BQU9ILGFBQWFJLEdBQUcsQ0FBQyxXQUFXLElBQUlDLE9BQU9DLFdBQVcsR0FBR0MsUUFBUTtRQUUxRSxNQUFNcEIsd0RBQVNBO1FBRWYsTUFBTXFCLFlBQVksSUFBSUgsS0FBSyxHQUFHRixLQUFLLG9CQUFvQixDQUFDO1FBQ3hELE1BQU1NLFVBQVUsSUFBSUosS0FBSyxHQUFHSyxPQUFPQyxRQUFRLENBQUNSLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQztRQUUzRSxNQUFNUyxTQUFTLE1BQU14QixxREFBS0EsQ0FBQ3lCLElBQUksQ0FBQztZQUM5QkMsV0FBVztnQkFBRUMsTUFBTVA7Z0JBQVdRLEtBQUtQO1lBQVE7UUFDN0MsR0FBR1EsSUFBSSxDQUFDO1lBQUVILFdBQVc7UUFBRTtRQUV2QixNQUFNSSxjQUFtQyxDQUFDO1FBQzFDLE1BQU1DLFNBQVM7WUFDYjtZQUFXO1lBQVk7WUFBUztZQUFTO1lBQU87WUFDaEQ7WUFBUTtZQUFVO1lBQWE7WUFBVztZQUFZO1NBQ3ZEO1FBRURBLE9BQU9DLE9BQU8sQ0FBQyxDQUFDQztZQUNkSCxXQUFXLENBQUNHLE1BQU0sR0FBRztnQkFDbkJBO2dCQUNBQyxZQUFZO2dCQUNaQyxhQUFhO2dCQUNiQyxtQkFBbUI7WUFDckI7UUFDRjtRQUVBWixPQUFPUSxPQUFPLENBQUMsQ0FBQ0s7WUFDZCxNQUFNSixRQUFRRixNQUFNLENBQUMsSUFBSWQsS0FBS29CLE1BQU1YLFNBQVMsRUFBRVksUUFBUSxHQUFHO1lBQzFEUixXQUFXLENBQUNHLE1BQU0sQ0FBQ0MsVUFBVSxJQUFJRyxNQUFNRSxVQUFVO1lBQ2pEVCxXQUFXLENBQUNHLE1BQU0sQ0FBQ0UsV0FBVyxJQUFJO1FBQ3BDO1FBRUFLLE9BQU9DLElBQUksQ0FBQ1gsYUFBYUUsT0FBTyxDQUFDLENBQUNDO1lBQ2hDLElBQUlILFdBQVcsQ0FBQ0csTUFBTSxDQUFDRSxXQUFXLEdBQUcsR0FBRztnQkFDdENMLFdBQVcsQ0FBQ0csTUFBTSxDQUFDRyxpQkFBaUIsR0FDbENOLFdBQVcsQ0FBQ0csTUFBTSxDQUFDQyxVQUFVLEdBQUdKLFdBQVcsQ0FBQ0csTUFBTSxDQUFDRSxXQUFXO1lBQ2xFO1FBQ0Y7UUFFQSxNQUFNTyxTQUFTRixPQUFPRyxNQUFNLENBQUNiO1FBRTdCLE9BQU9qQyxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDcUM7SUFDM0IsRUFBRSxPQUFPcEMsT0FBWTtRQUNuQnNDLFFBQVF0QyxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtZQUFFQyxPQUFPQSxNQUFNdUMsT0FBTyxJQUFJO1FBQTBCLEdBQ3BEO1lBQUV0QyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiRDpcXFVBUyBTb2Z0ZGV2XFxzYXZvcnlfYmFuYW5hc1xcYXBwXFxhcGlcXHJlcG9ydHNcXG1vbnRobHlcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoL25leHRcIlxyXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gXCJAL2xpYi9tb25nb2RiXCJcclxuaW1wb3J0IE9yZGVyIGZyb20gXCJAL21vZGVscy9PcmRlclwiXHJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIi4uLy4uL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXHJcblxyXG4gICAgaWYgKCFzZXNzaW9uKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDwn5SBIFVwZGF0ZTogQWRtaW4gJiBPd25lciBkaWl6aW5rYW5cclxuICAgIGNvbnN0IGFsbG93ZWRSb2xlcyA9IFtcImFkbWluXCIsIFwib3duZXJcIl1cclxuICAgIGlmICghYWxsb3dlZFJvbGVzLmluY2x1ZGVzKHNlc3Npb24udXNlci5yb2xlKSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGb3JiaWRkZW5cIiB9LCB7IHN0YXR1czogNDAzIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXHJcbiAgICBjb25zdCB5ZWFyID0gc2VhcmNoUGFyYW1zLmdldChcInllYXJcIikgfHwgbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKClcclxuXHJcbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxyXG5cclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGAke3llYXJ9LTAxLTAxVDAwOjAwOjAwLjAwMFpgKVxyXG4gICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKGAke051bWJlci5wYXJzZUludCh5ZWFyKSArIDF9LTAxLTAxVDAwOjAwOjAwLjAwMFpgKVxyXG5cclxuICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IE9yZGVyLmZpbmQoe1xyXG4gICAgICBjcmVhdGVkQXQ6IHsgJGd0ZTogc3RhcnREYXRlLCAkbHQ6IGVuZERhdGUgfSxcclxuICAgIH0pLnNvcnQoeyBjcmVhdGVkQXQ6IDEgfSlcclxuXHJcbiAgICBjb25zdCBtb250aGx5RGF0YTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9XHJcbiAgICBjb25zdCBtb250aHMgPSBbXHJcbiAgICAgIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIixcclxuICAgICAgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxyXG4gICAgXVxyXG5cclxuICAgIG1vbnRocy5mb3JFYWNoKChtb250aCkgPT4ge1xyXG4gICAgICBtb250aGx5RGF0YVttb250aF0gPSB7XHJcbiAgICAgICAgbW9udGgsXHJcbiAgICAgICAgdG90YWxTYWxlczogMCxcclxuICAgICAgICB0b3RhbE9yZGVyczogMCxcclxuICAgICAgICBhdmVyYWdlT3JkZXJWYWx1ZTogMCxcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBvcmRlcnMuZm9yRWFjaCgob3JkZXI6IHsgY3JlYXRlZEF0OiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlOyB0b3RhbFByaWNlOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBjb25zdCBtb250aCA9IG1vbnRoc1tuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLmdldE1vbnRoKCldXHJcbiAgICAgIG1vbnRobHlEYXRhW21vbnRoXS50b3RhbFNhbGVzICs9IG9yZGVyLnRvdGFsUHJpY2VcclxuICAgICAgbW9udGhseURhdGFbbW9udGhdLnRvdGFsT3JkZXJzICs9IDFcclxuICAgIH0pXHJcblxyXG4gICAgT2JqZWN0LmtleXMobW9udGhseURhdGEpLmZvckVhY2goKG1vbnRoKSA9PiB7XHJcbiAgICAgIGlmIChtb250aGx5RGF0YVttb250aF0udG90YWxPcmRlcnMgPiAwKSB7XHJcbiAgICAgICAgbW9udGhseURhdGFbbW9udGhdLmF2ZXJhZ2VPcmRlclZhbHVlID1cclxuICAgICAgICAgIG1vbnRobHlEYXRhW21vbnRoXS50b3RhbFNhbGVzIC8gbW9udGhseURhdGFbbW9udGhdLnRvdGFsT3JkZXJzXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LnZhbHVlcyhtb250aGx5RGF0YSlcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVzdWx0KVxyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyByZXBvcnRzOlwiLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBmZXRjaCByZXBvcnRzXCIgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiZGJDb25uZWN0IiwiT3JkZXIiLCJhdXRoT3B0aW9ucyIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiYWxsb3dlZFJvbGVzIiwiaW5jbHVkZXMiLCJ1c2VyIiwicm9sZSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInllYXIiLCJnZXQiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJOdW1iZXIiLCJwYXJzZUludCIsIm9yZGVycyIsImZpbmQiLCJjcmVhdGVkQXQiLCIkZ3RlIiwiJGx0Iiwic29ydCIsIm1vbnRobHlEYXRhIiwibW9udGhzIiwiZm9yRWFjaCIsIm1vbnRoIiwidG90YWxTYWxlcyIsInRvdGFsT3JkZXJzIiwiYXZlcmFnZU9yZGVyVmFsdWUiLCJvcmRlciIsImdldE1vbnRoIiwidG90YWxQcmljZSIsIk9iamVjdCIsImtleXMiLCJyZXN1bHQiLCJ2YWx1ZXMiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/reports/monthly/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable in .env.local\");\n}\nlet cached = global.mongooseGlobal;\nif (!cached) {\n    cached = global.mongooseGlobal = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        console.log(\"Connecting to MongoDB...\", MONGODB_URI);\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongooseInstance)=>{\n            console.log(\"Connected to MongoDB!\");\n            return mongooseInstance;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        console.error(\"Failed to connect to MongoDB:\", e);\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFTQSxJQUFJQyxTQUFTQyxPQUFPQyxjQUFjO0FBRWxDLElBQUksQ0FBQ0YsUUFBUTtJQUNYQSxTQUFTQyxPQUFPQyxjQUFjLEdBQUc7UUFBRUMsTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDL0Q7QUFFQSxlQUFlQztJQUNiLElBQUlMLE9BQU9HLElBQUksRUFBRTtRQUNmLE9BQU9ILE9BQU9HLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNILE9BQU9JLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBQyxRQUFRQyxHQUFHLENBQUMsNEJBQTRCYjtRQUN4Q0ksT0FBT0ksT0FBTyxHQUFHVCx1REFBZ0IsQ0FBQ0MsYUFBYVUsTUFBTUssSUFBSSxDQUFDLENBQUNDO1lBQ3pESixRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPRztRQUNUO0lBQ0Y7SUFFQSxJQUFJO1FBQ0ZaLE9BQU9HLElBQUksR0FBRyxNQUFNSCxPQUFPSSxPQUFPO0lBQ3BDLEVBQUUsT0FBT1MsR0FBRztRQUNWYixPQUFPSSxPQUFPLEdBQUc7UUFDakJJLFFBQVFNLEtBQUssQ0FBQyxpQ0FBaUNEO1FBQy9DLE1BQU1BO0lBQ1I7SUFFQSxPQUFPYixPQUFPRyxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIkQ6XFxVQVMgU29mdGRldlxcc2F2b3J5X2JhbmFuYXNcXGxpYlxcbW9uZ29kYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xyXG5cclxuaWYgKCFNT05HT0RCX1VSSSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluIC5lbnYubG9jYWxcIik7XHJcbn1cclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICB2YXIgbW9uZ29vc2VHbG9iYWw6IHtcclxuICAgIGNvbm46IHR5cGVvZiBtb25nb29zZSB8IG51bGw7XHJcbiAgICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xyXG4gIH07XHJcbn1cclxuXHJcbmxldCBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2VHbG9iYWw7XHJcblxyXG5pZiAoIWNhY2hlZCkge1xyXG4gIGNhY2hlZCA9IGdsb2JhbC5tb25nb29zZUdsb2JhbCA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkYkNvbm5lY3QoKSB7XHJcbiAgaWYgKGNhY2hlZC5jb25uKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XHJcbiAgfVxyXG5cclxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XHJcbiAgICBjb25zdCBvcHRzID0ge1xyXG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGluZyB0byBNb25nb0RCLi4uXCIsIE1PTkdPREJfVVJJKTtcclxuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2VJbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQ29ubmVjdGVkIHRvIE1vbmdvREIhXCIpO1xyXG4gICAgICByZXR1cm4gbW9uZ29vc2VJbnN0YW5jZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xyXG4gICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBjb25uZWN0IHRvIE1vbmdvREI6XCIsIGUpO1xyXG4gICAgdGhyb3cgZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjYWNoZWQuY29ubjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGJDb25uZWN0O1xyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsIm1vbmdvb3NlR2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25zb2xlIiwibG9nIiwiY29ubmVjdCIsInRoZW4iLCJtb25nb29zZUluc3RhbmNlIiwiZSIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/Order.ts":
/*!*************************!*\
  !*** ./models/Order.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst OrderProductSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    productId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"Stock\",\n        required: true\n    },\n    name: {\n        type: String,\n        required: true\n    },\n    quantity: {\n        type: Number,\n        required: true,\n        min: 1\n    },\n    price: {\n        type: Number,\n        required: true,\n        min: 0\n    }\n});\nconst OrderSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    customerName: {\n        type: String,\n        required: [\n            true,\n            \"Please provide customer name\"\n        ],\n        trim: true\n    },\n    products: {\n        type: [\n            OrderProductSchema\n        ],\n        required: true,\n        validate: {\n            validator: (products)=>products.length > 0,\n            message: \"Order must have at least one product\"\n        }\n    },\n    totalPrice: {\n        type: Number,\n        required: true,\n        min: 0\n    },\n    status: {\n        type: String,\n        enum: [\n            \"Not Yet Processed\",\n            \"Being Sent\",\n            \"Completed\"\n        ],\n        default: \"Not Yet Processed\"\n    },\n    paymentStatus: {\n        type: String,\n        enum: [\n            \"Paid\",\n            \"Not Yet Paid\"\n        ],\n        default: \"Not Yet Paid\"\n    }\n}, {\n    timestamps: true\n});\nconst Order = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Order || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Order\", OrderSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvT3JkZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThEO0FBbUI5RCxNQUFNQyxxQkFBcUIsSUFBSUQsd0RBQWUsQ0FBQztJQUM3Q0csV0FBVztRQUNUQyxNQUFNSix3REFBZSxDQUFDSyxLQUFLLENBQUNDLFFBQVE7UUFDcENDLEtBQUs7UUFDTEMsVUFBVTtJQUNaO0lBQ0FDLE1BQU07UUFDSkwsTUFBTU07UUFDTkYsVUFBVTtJQUNaO0lBQ0FHLFVBQVU7UUFDUlAsTUFBTVE7UUFDTkosVUFBVTtRQUNWSyxLQUFLO0lBQ1A7SUFDQUMsT0FBTztRQUNMVixNQUFNUTtRQUNOSixVQUFVO1FBQ1ZLLEtBQUs7SUFDUDtBQUNGO0FBRUEsTUFBTUUsY0FBYyxJQUFJZix3REFBZSxDQUNyQztJQUNFZ0IsY0FBYztRQUNaWixNQUFNTTtRQUNORixVQUFVO1lBQUM7WUFBTTtTQUErQjtRQUNoRFMsTUFBTTtJQUNSO0lBQ0FDLFVBQVU7UUFDUmQsTUFBTTtZQUFDSDtTQUFtQjtRQUMxQk8sVUFBVTtRQUNWVyxVQUFVO1lBQ1JDLFdBQVcsQ0FBQ0YsV0FBb0JBLFNBQVNHLE1BQU0sR0FBRztZQUNsREMsU0FBUztRQUNYO0lBQ0Y7SUFDQUMsWUFBWTtRQUNWbkIsTUFBTVE7UUFDTkosVUFBVTtRQUNWSyxLQUFLO0lBQ1A7SUFDQVcsUUFBUTtRQUNOcEIsTUFBTU07UUFDTmUsTUFBTTtZQUFDO1lBQXFCO1lBQWM7U0FBWTtRQUN0REMsU0FBUztJQUNYO0lBQ0FDLGVBQWU7UUFDYnZCLE1BQU1NO1FBQ05lLE1BQU07WUFBQztZQUFRO1NBQWU7UUFDOUJDLFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUUsWUFBWTtBQUFLO0FBR3JCLE1BQU1DLFFBQXVCN0Isd0RBQWUsQ0FBQzZCLEtBQUssSUFBSTdCLHFEQUFjLENBQVMsU0FBU2U7QUFFdEYsaUVBQWVjLEtBQUtBLEVBQUEiLCJzb3VyY2VzIjpbIkQ6XFxVQVMgU29mdGRldlxcc2F2b3J5X2JhbmFuYXNcXG1vZGVsc1xcT3JkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IHR5cGUgRG9jdW1lbnQsIHR5cGUgTW9kZWwgfSBmcm9tIFwibW9uZ29vc2VcIlxyXG5cclxuaW50ZXJmYWNlIE9yZGVyUHJvZHVjdCB7XHJcbiAgcHJvZHVjdElkOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZFxyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIHF1YW50aXR5OiBudW1iZXJcclxuICBwcmljZTogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9yZGVyIGV4dGVuZHMgRG9jdW1lbnQge1xyXG4gIGN1c3RvbWVyTmFtZTogc3RyaW5nXHJcbiAgcHJvZHVjdHM6IE9yZGVyUHJvZHVjdFtdXHJcbiAgdG90YWxQcmljZTogbnVtYmVyXHJcbiAgc3RhdHVzOiBcIk5vdCBZZXQgUHJvY2Vzc2VkXCIgfCBcIkJlaW5nIFNlbnRcIiB8IFwiQ29tcGxldGVkXCJcclxuICBwYXltZW50U3RhdHVzOiBcIlBhaWRcIiB8IFwiTm90IFlldCBQYWlkXCJcclxuICBjcmVhdGVkQXQ6IERhdGVcclxuICB1cGRhdGVkQXQ6IERhdGVcclxufVxyXG5cclxuY29uc3QgT3JkZXJQcm9kdWN0U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgcHJvZHVjdElkOiB7XHJcbiAgICB0eXBlOiBtb25nb29zZS5TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICByZWY6IFwiU3RvY2tcIixcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgbmFtZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICBxdWFudGl0eToge1xyXG4gICAgdHlwZTogTnVtYmVyLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICBtaW46IDEsXHJcbiAgfSxcclxuICBwcmljZToge1xyXG4gICAgdHlwZTogTnVtYmVyLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICBtaW46IDAsXHJcbiAgfSxcclxufSlcclxuXHJcbmNvbnN0IE9yZGVyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcclxuICB7XHJcbiAgICBjdXN0b21lck5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgY3VzdG9tZXIgbmFtZVwiXSxcclxuICAgICAgdHJpbTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBwcm9kdWN0czoge1xyXG4gICAgICB0eXBlOiBbT3JkZXJQcm9kdWN0U2NoZW1hXSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIHZhbGlkYXRlOiB7XHJcbiAgICAgICAgdmFsaWRhdG9yOiAocHJvZHVjdHM6IGFueVtdKSA9PiBwcm9kdWN0cy5sZW5ndGggPiAwLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiT3JkZXIgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBwcm9kdWN0XCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdG90YWxQcmljZToge1xyXG4gICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW46IDAsXHJcbiAgICB9LFxyXG4gICAgc3RhdHVzOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogW1wiTm90IFlldCBQcm9jZXNzZWRcIiwgXCJCZWluZyBTZW50XCIsIFwiQ29tcGxldGVkXCJdLFxyXG4gICAgICBkZWZhdWx0OiBcIk5vdCBZZXQgUHJvY2Vzc2VkXCIsXHJcbiAgICB9LFxyXG4gICAgcGF5bWVudFN0YXR1czoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIGVudW06IFtcIlBhaWRcIiwgXCJOb3QgWWV0IFBhaWRcIl0sXHJcbiAgICAgIGRlZmF1bHQ6IFwiTm90IFlldCBQYWlkXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH0sXHJcbilcclxuXHJcbmNvbnN0IE9yZGVyOiBNb2RlbDxJT3JkZXI+ID0gbW9uZ29vc2UubW9kZWxzLk9yZGVyIHx8IG1vbmdvb3NlLm1vZGVsPElPcmRlcj4oXCJPcmRlclwiLCBPcmRlclNjaGVtYSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9yZGVyXHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk9yZGVyUHJvZHVjdFNjaGVtYSIsIlNjaGVtYSIsInByb2R1Y3RJZCIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJuYW1lIiwiU3RyaW5nIiwicXVhbnRpdHkiLCJOdW1iZXIiLCJtaW4iLCJwcmljZSIsIk9yZGVyU2NoZW1hIiwiY3VzdG9tZXJOYW1lIiwidHJpbSIsInByb2R1Y3RzIiwidmFsaWRhdGUiLCJ2YWxpZGF0b3IiLCJsZW5ndGgiLCJtZXNzYWdlIiwidG90YWxQcmljZSIsInN0YXR1cyIsImVudW0iLCJkZWZhdWx0IiwicGF5bWVudFN0YXR1cyIsInRpbWVzdGFtcHMiLCJPcmRlciIsIm1vZGVscyIsIm1vZGVsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/Order.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a name\"\n        ],\n        trim: true\n    },\n    username: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a username\"\n        ],\n        unique: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a password\"\n        ],\n        minlength: 6\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"owner\"\n        ],\n        default: \"owner\"\n    }\n}, {\n    timestamps: true\n});\n// Hash password before saving\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\")) return next();\n    try {\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].genSalt(10);\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(this.password, salt);\n        next();\n    } catch (error) {\n        next(error);\n    }\n});\n// Compare password method\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compare(candidatePassword, this.password);\n};\n// Fix for \"Cannot overwrite model once compiled\" error\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQThEO0FBQ2pDO0FBVTdCLE1BQU1FLGFBQWEsSUFBSUYsd0RBQWUsQ0FDcEM7SUFDRUksTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUF3QjtRQUN6Q0MsTUFBTTtJQUNSO0lBQ0FDLFVBQVU7UUFDUkosTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBNEI7UUFDN0NHLFFBQVE7UUFDUkYsTUFBTTtJQUNSO0lBQ0FHLFVBQVU7UUFDUk4sTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBNEI7UUFDN0NLLFdBQVc7SUFDYjtJQUNBQyxNQUFNO1FBQ0pSLE1BQU1DO1FBQ05RLE1BQU07WUFBQztZQUFTO1NBQVE7UUFDeEJDLFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUMsWUFBWTtBQUFLO0FBR3JCLDhCQUE4QjtBQUM5QmQsV0FBV2UsR0FBRyxDQUFDLFFBQVEsZUFBZ0JDLElBQUk7SUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsVUFBVSxDQUFDLGFBQWEsT0FBT0Q7SUFFekMsSUFBSTtRQUNGLE1BQU1FLE9BQU8sTUFBTW5CLHdEQUFjLENBQUM7UUFDbEMsSUFBSSxDQUFDVSxRQUFRLEdBQUcsTUFBTVYscURBQVcsQ0FBQyxJQUFJLENBQUNVLFFBQVEsRUFBRVM7UUFDakRGO0lBQ0YsRUFBRSxPQUFPSyxPQUFZO1FBQ25CTCxLQUFLSztJQUNQO0FBQ0Y7QUFFQSwwQkFBMEI7QUFDMUJyQixXQUFXc0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZ0JDLGlCQUF5QjtJQUM1RSxPQUFPekIsd0RBQWMsQ0FBQ3lCLG1CQUFtQixJQUFJLENBQUNmLFFBQVE7QUFDeEQ7QUFFQSx1REFBdUQ7QUFDdkQsTUFBTWlCLE9BQXFCNUIsd0RBQWUsQ0FBQzRCLElBQUksSUFBSTVCLHFEQUFjLENBQVEsUUFBUUU7QUFFakYsaUVBQWUwQixJQUFJQSxFQUFBIiwic291cmNlcyI6WyJEOlxcVUFTIFNvZnRkZXZcXHNhdm9yeV9iYW5hbmFzXFxtb2RlbHNcXFVzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IHR5cGUgRG9jdW1lbnQsIHR5cGUgTW9kZWwgfSBmcm9tIFwibW9uZ29vc2VcIlxyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIGV4dGVuZHMgRG9jdW1lbnQge1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIHVzZXJuYW1lOiBzdHJpbmdcclxuICBwYXNzd29yZDogc3RyaW5nXHJcbiAgcm9sZTogXCJhZG1pblwiIHwgXCJvd25lclwiXHJcbiAgY29tcGFyZVBhc3N3b3JkOiAoY2FuZGlkYXRlUGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxyXG59XHJcblxyXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxJVXNlcj4oXHJcbiAge1xyXG4gICAgbmFtZToge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHJlcXVpcmVkOiBbdHJ1ZSwgXCJQbGVhc2UgcHJvdmlkZSBhIG5hbWVcIl0sXHJcbiAgICAgIHRyaW06IHRydWUsXHJcbiAgICB9LFxyXG4gICAgdXNlcm5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgYSB1c2VybmFtZVwiXSxcclxuICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgICB0cmltOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHBhc3N3b3JkOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmRcIl0sXHJcbiAgICAgIG1pbmxlbmd0aDogNixcclxuICAgIH0sXHJcbiAgICByb2xlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogW1wiYWRtaW5cIiwgXCJvd25lclwiXSxcclxuICAgICAgZGVmYXVsdDogXCJvd25lclwiLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9LFxyXG4pXHJcblxyXG4vLyBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZpbmdcclxuVXNlclNjaGVtYS5wcmUoXCJzYXZlXCIsIGFzeW5jIGZ1bmN0aW9uIChuZXh0KSB7XHJcbiAgaWYgKCF0aGlzLmlzTW9kaWZpZWQoXCJwYXNzd29yZFwiKSkgcmV0dXJuIG5leHQoKVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKVxyXG4gICAgdGhpcy5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHRoaXMucGFzc3dvcmQsIHNhbHQpXHJcbiAgICBuZXh0KClcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBuZXh0KGVycm9yKVxyXG4gIH1cclxufSlcclxuXHJcbi8vIENvbXBhcmUgcGFzc3dvcmQgbWV0aG9kXHJcblVzZXJTY2hlbWEubWV0aG9kcy5jb21wYXJlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAoY2FuZGlkYXRlUGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZClcclxufVxyXG5cclxuLy8gRml4IGZvciBcIkNhbm5vdCBvdmVyd3JpdGUgbW9kZWwgb25jZSBjb21waWxlZFwiIGVycm9yXHJcbmNvbnN0IFVzZXI6IE1vZGVsPElVc2VyPiA9IG1vbmdvb3NlLm1vZGVscy5Vc2VyIHx8IG1vbmdvb3NlLm1vZGVsPElVc2VyPihcIlVzZXJcIiwgVXNlclNjaGVtYSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJcclxuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiYmNyeXB0IiwiVXNlclNjaGVtYSIsIlNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ0cmltIiwidXNlcm5hbWUiLCJ1bmlxdWUiLCJwYXNzd29yZCIsIm1pbmxlbmd0aCIsInJvbGUiLCJlbnVtIiwiZGVmYXVsdCIsInRpbWVzdGFtcHMiLCJwcmUiLCJuZXh0IiwiaXNNb2RpZmllZCIsInNhbHQiLCJnZW5TYWx0IiwiaGFzaCIsImVycm9yIiwibWV0aG9kcyIsImNvbXBhcmVQYXNzd29yZCIsImNhbmRpZGF0ZVBhc3N3b3JkIiwiY29tcGFyZSIsIlVzZXIiLCJtb2RlbHMiLCJtb2RlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CUAS%20Softdev%5Csavory_bananas%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CUAS%20Softdev%5Csavory_bananas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CUAS%20Softdev%5Csavory_bananas%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CUAS%20Softdev%5Csavory_bananas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_UAS_Softdev_savory_bananas_app_api_reports_monthly_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/reports/monthly/route.ts */ \"(rsc)/./app/api/reports/monthly/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/reports/monthly/route\",\n        pathname: \"/api/reports/monthly\",\n        filename: \"route\",\n        bundlePath: \"app/api/reports/monthly/route\"\n    },\n    resolvedPagePath: \"D:\\\\UAS Softdev\\\\savory_bananas\\\\app\\\\api\\\\reports\\\\monthly\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_UAS_Softdev_savory_bananas_app_api_reports_monthly_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZXBvcnRzJTJGbW9udGhseSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcmVwb3J0cyUyRm1vbnRobHklMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZyZXBvcnRzJTJGbW9udGhseSUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDVUFTJTIwU29mdGRldiU1Q3Nhdm9yeV9iYW5hbmFzJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDVUFTJTIwU29mdGRldiU1Q3Nhdm9yeV9iYW5hbmFzJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRDpcXFxcVUFTIFNvZnRkZXZcXFxcc2F2b3J5X2JhbmFuYXNcXFxcYXBwXFxcXGFwaVxcXFxyZXBvcnRzXFxcXG1vbnRobHlcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3JlcG9ydHMvbW9udGhseS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JlcG9ydHMvbW9udGhseVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVwb3J0cy9tb250aGx5L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcVUFTIFNvZnRkZXZcXFxcc2F2b3J5X2JhbmFuYXNcXFxcYXBwXFxcXGFwaVxcXFxyZXBvcnRzXFxcXG1vbnRobHlcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CUAS%20Softdev%5Csavory_bananas%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CUAS%20Softdev%5Csavory_bananas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/preact-render-to-string","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CUAS%20Softdev%5Csavory_bananas%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CUAS%20Softdev%5Csavory_bananas&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();