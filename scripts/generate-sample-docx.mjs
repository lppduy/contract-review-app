import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ text: 'HỢP ĐỒNG LAO ĐỘNG', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
      new Paragraph({ text: '(Dùng để test - có chứa một số điều khoản bất thường)', alignment: AlignmentType.CENTER }),
      new Paragraph({ text: 'Số: 2024/HĐLĐ-001 | Ngày ký: 01/03/2024' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'GIỮA CÁC BÊN:', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ children: [new TextRun({ text: 'BÊN SỬ DỤNG LAO ĐỘNG (BÊN A):', bold: true })] }),
      new Paragraph({ text: 'Công ty TNHH Công Nghệ ABC Việt Nam' }),
      new Paragraph({ text: 'Địa chỉ: Tầng 12, Tòa nhà Landmark 81, Quận Bình Thạnh, TP.HCM' }),
      new Paragraph({ text: 'Người đại diện: Ông Nguyễn Văn Hùng – Giám đốc' }),
      new Paragraph({ text: '' }),
      new Paragraph({ children: [new TextRun({ text: 'BÊN LAO ĐỘNG (BÊN B):', bold: true })] }),
      new Paragraph({ text: 'Họ và tên: Trần Thị Minh | Ngày sinh: 15/05/1995' }),
      new Paragraph({ text: 'CCCD: 079195012345 | Địa chỉ: 123 Nguyễn Trãi, Quận 5, TP.HCM' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 1: CÔNG VIỆC VÀ ĐỊA ĐIỂM LÀM VIỆC', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '1.1. Chức danh: Lập trình viên Backend' }),
      new Paragraph({ text: '1.2. Địa điểm làm việc: Văn phòng công ty hoặc bất kỳ nơi nào theo yêu cầu của Bên A' }),
      new Paragraph({ text: '1.3. Bên B có thể bị điều chuyển đến chi nhánh, văn phòng đại diện hoặc các dự án tại tỉnh thành khác theo quyết định đơn phương của Bên A mà không cần sự đồng ý của Bên B.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 2: THỜI HẠN HỢP ĐỒNG', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '2.1. Loại hợp đồng: Hợp đồng có thời hạn 12 tháng (01/03/2024 – 28/02/2025)' }),
      new Paragraph({ text: '2.2. Thử việc 60 ngày: Bên A có quyền chấm dứt bất cứ lúc nào mà không cần thông báo trước và không phải bồi thường.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 3: LƯƠNG VÀ PHỤ CẤP', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '3.1. Lương cơ bản: 15.000.000 VNĐ/tháng, chuyển khoản cuối tháng' }),
      new Paragraph({ text: '3.2. Bên A có quyền điều chỉnh lương xuống tối đa 30% nếu kết quả kinh doanh không đạt chỉ tiêu, mà không cần thỏa thuận với Bên B.' }),
      new Paragraph({ text: '3.3. Lương tháng 13: Tùy thuộc vào quyết định của Ban Giám đốc, không cam kết.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 4: THỜI GIAN LÀM VIỆC', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '4.1. Làm việc từ 8h00 – 17h00, Thứ Hai đến Thứ Bảy (6 ngày/tuần)' }),
      new Paragraph({ text: '4.2. Bên B phải sẵn sàng làm thêm giờ kể cả ngày Chủ Nhật và ngày lễ khi có yêu cầu. Tiền OT theo quy định nội bộ Bên A.' }),
      new Paragraph({ text: '4.3. Nghỉ phép năm: 10 ngày/năm. Phép không dùng hết sẽ bị hủy, không quy đổi thành tiền.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 5: BẢO HIỂM XÃ HỘI', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '5.1. Bên A đóng BHXH, BHYT theo quy định pháp luật.' }),
      new Paragraph({ text: '5.2. Mức lương đóng BHXH: 6.000.000 VNĐ/tháng (không phải mức lương thực tế).' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 6: CAM KẾT BẢO MẬT VÀ KHÔNG CẠNH TRANH', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '6.1. Bên B cam kết bảo mật toàn bộ thông tin của Bên A trong thời gian làm việc.' }),
      new Paragraph({ text: '6.2. Trong vòng 24 tháng sau khi nghỉ việc, Bên B không được làm việc cho bất kỳ công ty nào trong lĩnh vực công nghệ tại Việt Nam.' }),
      new Paragraph({ text: '6.3. Vi phạm điều khoản 6.2, Bên B phải bồi thường 500.000.000 VNĐ cho Bên A.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 7: CHẤM DỨT HỢP ĐỒNG', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '7.1. Bên A có quyền đơn phương chấm dứt hợp đồng với thông báo trước 3 ngày làm việc.' }),
      new Paragraph({ text: '7.2. Bên B muốn nghỉ việc phải thông báo trước 60 ngày và hoàn thành bàn giao theo yêu cầu Bên A.' }),
      new Paragraph({ text: '7.3. Nếu Bên B nghỉ trước thời hạn, phải bồi thường 3 tháng lương cho Bên A.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'ĐIỀU 8: GIẢI QUYẾT TRANH CHẤP', heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: '8.1. Tranh chấp được giải quyết tại Tòa án nhân dân Quận Bình Thạnh, TP.HCM.' }),
      new Paragraph({ text: '' }),

      new Paragraph({ text: 'Hợp đồng được lập thành 02 bản, mỗi bên giữ 01 bản, có giá trị pháp lý như nhau.' }),
      new Paragraph({ text: '' }),
      new Paragraph({ text: 'ĐẠI DIỆN BÊN A: Nguyễn Văn Hùng – Giám đốc' }),
      new Paragraph({ text: 'BÊN B: Trần Thị Minh' }),
    ]
  }]
})

const buffer = await Packer.toBuffer(doc)
const outPath = join(__dirname, '../docs/samples/hop-dong-lao-dong-mau.docx')
writeFileSync(outPath, buffer)
console.log('✓ Created:', outPath)
