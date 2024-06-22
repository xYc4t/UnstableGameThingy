"use strict";
var CharacterSkillComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, s) {
      var r,
        h = arguments.length,
        o =
          h < 3
            ? i
            : null === s
            ? (s = Object.getOwnPropertyDescriptor(i, e))
            : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, i, e, s);
      else
        for (var l = t.length - 1; 0 <= l; l--)
          (r = t[l]) &&
            (o = (h < 3 ? r(o) : 3 < h ? r(i, e, o) : r(i, e)) || o);
      return 3 < h && o && Object.defineProperty(i, e, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterSkillComponent = exports.SKILL_GROUP_MAIN = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../../../../Core/Entity/Entity"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController"),
  FormationEvent_1 = require("../../../../../Module/Formation/FormationEvent"),
  PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil"),
  ActorUtils_1 = require("../../../../../Utils/ActorUtils"),
  CombatDebugController_1 = require("../../../../../Utils/CombatDebugController"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
  CharacterAbilityComponent_1 = require("../Abilities/CharacterAbilityComponent"),
  CharacterBuffIds_1 = require("../Abilities/CharacterBuffIds"),
  CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes"),
  CustomMovementDefine_1 = require("../Move/CustomMovementDefine"),
  Skill_1 = require("./Skill"),
  SkillBehaviorAction_1 = require("./SkillBehavior/SkillBehaviorAction"),
  SkillBehaviorCondition_1 = require("./SkillBehavior/SkillBehaviorCondition");
var EAttributeId = Protocol_1.Aki.Protocol.EAttributeType;
const ROLLING_GROUNDED_RECOVER_TIME = 600,
  SKILL_TURN_TIME = 0.15,
  DEFAULT_CD_TIME = -1,
  HIT_CASE_SOCKET_NAME = "HitCase",
  SKILL_GROUP_INDEX = ((exports.SKILL_GROUP_MAIN = 1), 0),
  interruptTag = -242791826;
class AnimNotifyStateSkillRotateStyle {
  constructor() {
    (this.IsUseAnsRotateOffset = !1),
      (this.AnsRotateOffset = Rotator_1.Rotator.Create()),
      (this.PauseRotateThreshold = 0),
      (this.ResumeRotateThreshold = 0),
      (this.IsPaused = !1);
  }
  Reset() {
    (this.IsUseAnsRotateOffset = !1),
      this.AnsRotateOffset.Reset(),
      (this.PauseRotateThreshold = 0),
      (this.ResumeRotateThreshold = 0),
      (this.IsPaused = !1);
  }
}
class SkillRotateTarget {
  constructor() {
    (this.Target = void 0), (this.Type = 0);
  }
}
let CharacterSkillComponent =
  (CharacterSkillComponent_1 = class CharacterSkillComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.SWo = void 0),
        (this.yWo = void 0),
        (this.IWo = void 0),
        (this.TWo = void 0),
        (this.LWo = void 0),
        (this.DWo = void 0),
        (this.RWo = void 0),
        (this.UWo = void 0),
        (this.AWo = void 0),
        (this.xWo = void 0),
        (this.PWo = void 0),
        (this.wWo = void 0),
        (this.BWo = void 0),
        (this.bWo = void 0),
        (this.qWo = void 0),
        (this.GWo = void 0),
        (this.NWo = void 0),
        (this.OWo = void 0),
        (this.kWo = void 0),
        (this.FWo = void 0),
        (this.VWo = void 0),
        (this.HWo = !1),
        (this.LoadedSkills = new Map()),
        (this.jWo = new Map()),
        (this.WWo = new Set()),
        (this.KWo = void 0),
        (this.QWo = void 0),
        (this.Pye = void 0),
        (this.fWo = void 0),
        (this.eie = void 0),
        (this.DXr = void 0),
        (this.XXr = void 0),
        (this.fte = void 0),
        (this.lce = void 0),
        (this.$Wo = void 0),
        (this.XWo = void 0),
        (this.YWo = void 0),
        (this.vwe = void 0),
        (this.CDe = void 0),
        (this.loe = void 0),
        (this.f4o = void 0),
        (this.JWo = void 0),
        (this.FightStateComp = void 0),
        (this.StateMachineComp = void 0),
        (this.pLo = Vector_1.Vector.Create()),
        (this.pz = Vector_1.Vector.Create()),
        (this._ue = Rotator_1.Rotator.Create()),
        (this.L_e = Transform_1.Transform.Create()),
        (this.zWo = (t) => {
          this.SkillTarget?.Id === t.Id && (this.SkillTarget = void 0);
        }),
        (this.CCo = () => {
          this.StopAllSkills("CharacterSkillComponent.OnTeleportStart");
        }),
        (this.ZWo = () => {
          //this.StopGroup1Skill("受击打断技能");
        }),
        (this.OnSwitchControl = (t) => {
          for (var [i, e] of this.LoadedSkills)
            e.Active &&
              (CombatDebugController_1.CombatDebugController.CombatInfo(
                "Skill",
                this.Entity,
                "切换控制权，结束当前技能",
                ["技能Id", i]
              ),
              e.IsSimulated
                ? this.SimulateEndSkill(i)
                : this.EndSkill(i, "CharacterSkillComponent.OnSwitchControl"));
        }),
        (this.eKo = () => {
          var t = this.Entity.GetComponent(33);
          t.Valid &&
            !this.eie.ContainsTagById(-1371021686) &&
            (CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              this.Entity,
              "疑难杂症debug日志，RollingGroundedDelay"
            ),
            (t.IsMainSkillReadyEnd = !0)),
            (this.tKo = void 0);
        }),
        (this.tKo = void 0),
        (this.iKo = !1),
        (this.IsMainSkillReadyEnd = !0),
        (this.SkillTarget = void 0),
        (this.SkillTargetSocket = ""),
        (this.rKo = (t) => {
          var i = this.CurrentSkill;
          i &&
            i.SkillInfo.SkillTarget.HateOrLockOnChanged &&
            ((this.SkillTarget =
              ModelManager_1.ModelManager.CharacterModel.GetHandle(t)),
            (this.SkillTargetSocket = ""));
        }),
        (this.i7o = (t) => {
          this.SkillTarget?.Id === t && this.lCn();
        }),
        (this.fpe = (t, i) => {
          this.SkillTarget === i && this.lCn();
        }),
        (this.Lqo = (t) => {
          t = t.GetComponent(33);
          (this.SkillTarget = t.SkillTarget),
            (this.SkillTargetSocket = t.SkillTargetSocket);
        }),
        (this.oKo = !1),
        (this.nKo = void 0),
        (this.sKo = 0),
        (this.aKo = void 0),
        (this.hKo = !1),
        (this.IgnoreSocketName = new Set()),
        (this.lKo = new Map()),
        (this._Ko = 0),
        (this.uKo = 0),
        (this.cKo = 0);
    }
    get CurrentSkill() {
      return this.jWo.get(exports.SKILL_GROUP_MAIN)?.[SKILL_GROUP_INDEX];
    }
    get DtSkillInfo() {
      return this.QWo;
    }
    GetSkillInfo(e) {
      if (this.QWo) {
        if (0 !== e) {
          if (!GlobalData_1.GlobalData.IsPlayInEditor) {
            var s = this.LoadedSkills.get(e);
            if (s) return s.SkillInfo;
          }
          let i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.QWo,
            e.toString()
          );
          if (!i) {
            let t = void 0;
            s = this.Pye.GetEntityType();
            s === Protocol_1.Aki.Protocol.EEntityType.Player
              ? (t =
                  ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo())
              : s === Protocol_1.Aki.Protocol.EEntityType.Monster
              ? (t =
                  ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillInfo())
              : s === Protocol_1.Aki.Protocol.EEntityType.Vision &&
                (t =
                  ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillInfo()),
              t &&
                (i = DataTableUtil_1.DataTableUtil.GetDataTableRow(
                  t,
                  e.toString()
                ));
          }
          return i;
        }
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Character",
            29,
            "获取技能表数据（GetSkillInfo） id 不存在",
            ["EntityId", this.Entity.Id],
            ["skillId", e]
          );
      }
    }
    GetSkill(t) {
      return this.LoadedSkills.get(t);
    }
    GetSkillMap() {
      return this.LoadedSkills;
    }
    GetPriority(e) {
      if (this.CheckIsLoaded()) {
        let t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
            this.QWo,
            e.toString()
          ),
          i = void 0;
        if (
          (this.Pye.GetEntityType() ===
          Protocol_1.Aki.Protocol.EEntityType.Player
            ? (i =
                ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillInfo())
            : this.Pye.GetEntityType() ===
              Protocol_1.Aki.Protocol.EEntityType.Monster
            ? (i =
                ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillInfo())
            : this.Pye.GetEntityType() ===
                Protocol_1.Aki.Protocol.EEntityType.Vision &&
              (i =
                ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillInfo()),
          (t =
            !t && i
              ? DataTableUtil_1.DataTableUtil.GetDataTableRow(i, e.toString())
              : t))
        )
          return t.InterruptLevel;
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Character",
            23,
            "没有该技能的打断等级",
            ["玩家id:", this.Entity.Id],
            ["skillID：", e]
          );
      }
      return -1;
    }
    OnInitData() {
      return (
        (this.nKo = new AnimNotifyStateSkillRotateStyle()),
        (this.aKo = new SkillRotateTarget()),
        CharacterSkillComponent_1.mKo ||
          ((CharacterSkillComponent_1.dKo =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "jump_priority"
            )),
          (CharacterSkillComponent_1.CKo =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "fly_priority"
            )),
          (CharacterSkillComponent_1.mKo = !0)),
        !0
      );
    }
    OnInit() {
      return (
        (this.Pye = this.Entity.CheckGetComponent(0)),
        (this.fte = this.Entity.CheckGetComponent(3)),
        (this.fWo = this.Entity.CheckGetComponent(155)),
        (this.DXr = this.Entity.CheckGetComponent(156)),
        (this.eie = this.Entity.CheckGetComponent(184)),
        (this.XXr = this.Entity.CheckGetComponent(17)),
        (this.vwe = this.Entity.CheckGetComponent(157)),
        (this.lce = this.Entity.GetComponent(160)),
        (this.$Wo = this.Entity.GetComponent(16)),
        (this.XWo = this.Entity.GetComponent(29)),
        (this.CDe = this.Entity.GetComponent(159)),
        (this.loe = this.Entity.GetComponent(38)),
        (this.YWo = this.Entity.GetComponent(83)),
        (this.f4o = this.Entity.GetComponent(107)),
        (this.JWo = this.Entity.GetComponent(185)),
        (this.FightStateComp = this.Entity.GetComponent(45)),
        (this.StateMachineComp = this.Entity.GetComponent(64)),
        !0
      );
    }
    OnDisable(t) {
      this.Entity.IsInit && this.StopAllSkills(t);
    }
    CheckIsLoaded() {
      return (
        this.HWo ||
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Skill",
            this.Entity,
            "SkillComponent没有加载完成"
          ),
        this.HWo
      );
    }
    gKo() {
      var t,
        i = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          this.fte.Actor.GetClass()
        ),
        i = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(i),
        e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(i),
        e =
          (e ||
            CombatDebugController_1.CombatDebugController.CombatWarn(
              "Skill",
              this.Entity,
              "SkillComponent中找不到FightInfo信息"
            ),
          e?.SkillDataTable?.ToAssetPathName());
      e &&
        0 < e.length &&
        "None" !== e &&
        ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          e,
          UE.DataTable
        )) ||
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.Entity,
            "SkillComponent中找不到技能表",
            ["ActorPath", i],
            ["技能表Path", e]
          ),
        (this.QWo = t));
    }
    fKo() {
      var t = (0, puerts_1.$ref)(void 0),
        i =
          (UE.DataTableFunctionLibrary.GetDataTableRowNames(this.QWo, t),
          (0, puerts_1.$unref)(t));
      for (let t = 0; t < i.Num(); t++) {
        var e = Number(i.Get(t).toString()),
          s = this.GetSkillInfo(e);
        s && 0 === s.SkillLoadType && this.pKo(e, DEFAULT_CD_TIME);
      }
      let r = [];
      switch (this.Pye.GetEntityType()) {
        case Protocol_1.Aki.Protocol.EEntityType.Player:
          r =
            ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames();
          break;
        case Protocol_1.Aki.Protocol.EEntityType.Monster:
          r =
            ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames();
          break;
        case Protocol_1.Aki.Protocol.EEntityType.Vision:
          r =
            ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames();
      }
      let h = void 0;
      var t = this.fte.CreatureData.GetVisionComponent();
      t &&
        (t = PhantomUtil_1.PhantomUtil.GetVisionData(t.VisionId)) &&
        (h = t.类型);
      for (const n of r) {
        var o = Number(n),
          l = this.GetSkillInfo(o);
        l &&
          (0 === l.SkillLoadType ||
            (3 === l.SkillLoadType && 1 === Number(h)) ||
            (2 === l.SkillLoadType && 0 === Number(h))) &&
          this.pKo(o, DEFAULT_CD_TIME);
      }
    }
    pKo(i, t) {
      try {
        var e,
          s = this.GetSkillInfo(i);
        s
          ? this.LoadedSkills.has(i)
            ? CombatDebugController_1.CombatDebugController.CombatError(
                "Skill",
                this.Entity,
                "LoadSkill失败，重复加载技能",
                ["技能Id", i]
              )
            : ((e = new Skill_1.Skill()).Initialize(i, s, this, t),
              this.JWo && (e.GroupSkillCdInfo = this.JWo.InitSkillCd(e)),
              this.LoadedSkills.get(i) ||
                (this.LoadedSkills.set(i, e),
                this.lKo.set(s.SkillName.toString(), e)))
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              this.Entity,
              "LoadSkill失败，找不到技能配置数据",
              ["技能Id", i]
            );
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Battle",
              18,
              "加载技能异常",
              t,
              ["skillId", i],
              ["error", t.message]
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              18,
              "加载技能异常",
              ["skillId", i],
              ["error", t]
            );
      }
    }
    vKo() {
      ConfigManager_1.ConfigManager.BulletConfig.PreloadBulletData(this.Entity);
    }
    OnStart() {
      return (
        this.gKo(),
        this.fKo(),
        this.vKo(),
        (this.HWo = !0),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.zWo
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.i7o
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.RemoveEntity,
          this.fpe
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.CCo
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.ZWo
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          this.OnSwitchControl
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          this.rKo
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.Lqo
        ),
        !0
      );
    }
    OnChangeTimeDilation(t) {
      var i = this.f4o.CurrentTimeScale;
      for (const e of this.GetAllActivatedSkill()) e.SetTimeDilation(i, t);
    }
    OnEnd() {
      if (
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnEndPlay,
          this.zWo
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.CharOnRoleDead,
          this.i7o
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.RemoveEntity,
          this.fpe
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.TeleportStartEntity,
          this.CCo
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitAnim,
          this.ZWo
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharSwitchControl,
          this.OnSwitchControl
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.AiHateTargetChanged,
          this.rKo
        ),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.RoleOnStateInherit,
          this.Lqo
        ),
        this.IgnoreSocketName.clear(),
        this.nKo.Reset(),
        this.LoadedSkills)
      )
        for (const t of this.LoadedSkills.values()) t.Clear();
      return (
        this.LoadedSkills.clear(),
        (this.iKo = !1),
        (this.IsMainSkillReadyEnd = !0),
        (this.oKo = !1),
        (this.hKo = !1),
        (this._Ko = 0),
        (this.uKo = 0),
        (this.sKo = 0),
        (this.cKo = 0),
        (this.HWo = !1),
        void 0 !== this.tKo &&
          (TimerSystem_1.TimerSystem.Remove(this.tKo), (this.tKo = void 0)),
        !0
      );
    }
    AttachEffectToSkill(t, i, e, s) {
      var r, h;
      this.CheckIsLoaded() &&
        (r = this.CurrentSkill) &&
        ((h = this.f4o.CurrentTimeScale),
        EffectSystem_1.EffectSystem.SetTimeScale(t, h * this.TimeDilation),
        r.AttachEffect(t, i, e, s));
    }
    MKo(t) {
      let i = 1;
      t = t.SkillInfo;
      return (
        0 === t.SkillGenre
          ? (i = 1e-4 * this.fWo.GetCurrentValue(EAttributeId.AutoAttackSpeed))
          : 1 === t.SkillGenre &&
            (i = 1e-4 * this.fWo.GetCurrentValue(EAttributeId.CastAttackSpeed)),
        (i = i <= 0 ? 1 : i)
      );
    }
    PlaySkillMontage(t, i, e, s, r) {
      var h = this.CurrentSkill;
      if (!h)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "播放技能蒙太奇时，当前技能不存在",
            ["montageIndex", i]
          ),
          !1
        );
      if (h.IsSimulated)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "播放技能蒙太奇时，当前技能是模拟技能",
            ["montageIndex", i]
          ),
          !1
        );
      if (t && this.eie.ContainsTagById(-1503953470)) return !1;
      this.vwe.ExitHitState("播放技能蒙太奇");
      (t = this.MKo(h)), (r = h.PlayMontage(i, t, e, s, r));
      return (
        r &&
          SkillMessageController_1.SkillMessageController.MontageRequest(
            this.Entity,
            1,
            h.SkillId?.toString(),
            this.SkillTarget?.Id ?? 0,
            i,
            t,
            e,
            s,
            h.CombatMessageId,
            h.MontageContextId
          ),
        r
      );
    }
    EndOwnerAndFollowSkills() {
      this.StopAllSkills("CharacterSkillComponent.EndOwnerAndFollowSkills");
      var t = this.Entity.GetComponent(46)?.FollowIds;
      if (t)
        for (const e of t) {
          var i = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(33);
          i &&
            i.StopAllSkills("CharacterSkillComponent.EndOwnerAndFollowSkills");
        }
    }
    StopAllSkills(t) {
      if (this.CheckIsLoaded())
        for (const i of this.GetAllActivatedSkill()) this.EKo(i, t);
    }
    StopGroup1Skill(t) {
      var i;
      this.CheckIsLoaded() && (i = this.CurrentSkill) && this.EKo(i, t);
    }
    EndSkill(t, i) {
      this.CheckIsLoaded() &&
        (t = this.LoadedSkills.get(t))?.Active &&
        this.SKo(t, i);
    }
    yKo(t, i) {
      var e = t.SkillInfo.GroupId,
        s = t.SkillInfo.InterruptLevel;
      return this.IKo(e, s, i, t);
    }
    CheckJumpCanInterrupt() {
      return this.IKo(
        exports.SKILL_GROUP_MAIN,
        CharacterSkillComponent_1.dKo,
        []
      );
    }
    CheckGlideCanInterrupt() {
      return this.IKo(
        exports.SKILL_GROUP_MAIN,
        CharacterSkillComponent_1.CKo,
        []
      );
    }
    IKo(t, i, e, s) {
      let r = !0;
      if (t === exports.SKILL_GROUP_MAIN) {
        var h,
          o = this.CurrentSkill;
        o &&
          ((l = (h = o.SkillInfo).InterruptLevel < i),
          (h = h.InterruptLevel === i && this.iKo),
          (i = this.IsMainSkillReadyEnd),
          l || h || i ? e.push(o) : (r = !1));
      } else {
        var l = this.jWo.get(t);
        if (l)
          for (const n of l) {
            if (this.IsSkillInCd(n.SkillId)) {
              r = !1;
              break;
            }
            n === s && e.push(n);
          }
      }
      return r || (e.length = 0), r;
    }
    EKo(t, i) {
      t?.Active &&
        (t.IsSimulated
          ? this.SimulateEndSkill(t.SkillId)
          : (EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.CharInterruptSkill,
              this.Entity.Id,
              t.SkillId
            ),
            this.SKo(t, i)));
    }
    SKo(t, i) {
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Skill",
        this.Entity,
        "CharacterSkillComponent.RequestEndSkill",
        ["结束技能ID", t.SkillId],
        ["结束技能名称", t.SkillName],
        ["Reason", i],
        ["CanInterrupt", this.iKo],
        ["ReadyEnd", this.IsMainSkillReadyEnd]
      ),
        this.JWo?.ResetMultiSkills(t.SkillId),
        this.JWo?.ResetCdDelayTime(t.SkillId);
      i = t.SkillInfo.SkillMode;
      1 === i
        ? t.ActiveAbility?.IsValid()
          ? t.ActiveAbility.K2_EndAbility()
          : CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              this.Entity,
              "[CharacterSkillComponent.RequestEndSkill]技能结束失败，找不到GA（判断一下是否被动GA，如果是，不能主动执行）",
              ["技能ID", t.SkillId],
              ["技能名称", t.SkillName]
            )
        : 0 === i && t.RequestStopMontage();
    }
    IsSkillGenreForbidden(t) {
      switch (t.SkillGenre) {
        case 0:
          return this.eie.ContainsTagById(866007727);
        case 1:
          return this.eie.ContainsTagById(443489183);
        case 2:
          return this.eie.ContainsTagById(495657548);
        case 3:
          return this.eie.ContainsTagById(-592555498);
        case 4:
        case 5:
          break;
        case 6:
          return this.eie.ContainsTagById(-1390464883);
        case 7:
          return this.eie.ContainsTagById(1072084846);
        case 8:
          break;
        case 9:
          return this.eie.ContainsTagById(1195493782);
        case 10:
          return this.eie.ContainsTagById(283451623);
        case 11:
          return this.eie.ContainsTagById(-1936884442);
      }
      return !1;
    }
    TKo(t, i) {
      var e,
        s = t.SkillInfo;
      return this.fte.IsAutonomousProxy || s.AutonomouslyBySimulate
        ? this.eie.ContainsTagById(-1388400236)
          ? "角色处于不可控制状态"
          : this.eie.ContainsTagById(1008164187)
          ? "角色处于死亡状态"
          : this.$Wo?.IsFrozen()
          ? "角色处于冰冻状态"
          : this.IsSkillGenreForbidden(s)
          ? "该类别技能被临时禁止"
          : 8 === s.SkillGenre
          ? "不能主动调用被动技能"
          : t.AbilityClass && t.AbilityClass.IsA(UE.Ga_Passive_C.StaticClass())
          ? "策划可能误把被动GA放在普攻0技能组里"
          : this.IsSkillInCd(t.SkillId)
          ? "技能处于CD中"
          : 0 !== s.StrengthCost &&
            FormationAttributeController_1.FormationAttributeController.GetValue(
              1
            ) <= 1
          ? "体力不足"
          : this.JWo?.IsMultiSkill(t) && !this.JWo.StartMultiSkill(t)
          ? "多段技能启动失败"
          : ((s = this.Pye.GetEntityType()),
            (e = this.loe?.AiController?.IsWaitingSwitchControl()),
            s === Protocol_1.Aki.Protocol.EEntityType.Monster &&
            !t.SkillInfo.AutonomouslyBySimulate &&
            e
              ? "在等待切换控制权期间，不允许释放普通技能"
              : this.yKo(t, i)
              ? ""
              : "技能打断失败")
        : "非主控无权限释放技能";
    }
    BeginSkill(t, i = {}) {
      if (!this.CheckIsLoaded()) return !1;
      const e = this.LoadedSkills.get(t);
      if (!e)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "BeginSkill使用了不存在的技能",
            ["技能Id", t]
          ),
          !1
        );
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Skill",
        this.Entity,
        "CharacterSkillComponent.BeginSkill",
        ["技能Id", t],
        ["技能名", e.SkillName],
        ["上下文", i.Context]
      );
      var s = [],
        r = this.TKo(e, s);
      if (r)
        return (
          CombatDebugController_1.CombatDebugController.CombatInfo(
            "Skill",
            this.Entity,
            "CharacterSkillComponent.CheckSkillCanBegin条件不满足",
            ["技能Id", t],
            ["技能名", e.SkillName],
            ["当前技能", this.CurrentSkill?.SkillId],
            ["当前技能名", this.CurrentSkill?.SkillName],
            ["原因", r]
          ),
          !1
        );
      s.forEach((t) => {
        this.EKo(t, "开始新技能");
      });
      var r = this.GetSkillInfo(t),
        s = this.fte?.IsAutonomousProxy ?? !1,
        h = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
      if (this.FightStateComp && r.GroupId === exports.SKILL_GROUP_MAIN && !h) {
        h = this.FightStateComp.TrySwitchSkillState(e.SkillInfo, !0);
        if (!h)
          return (
            CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              this.Entity,
              "技能释放失败，状态不满足",
              ["技能Id", t],
              ["技能名", e.SkillName]
            ),
            !1
          );
        e.FightStateHandle = h;
      } else e.FightStateHandle = 0;
      this.LKo(i.Target, i.SocketName, r.SkillTarget),
        (e.PreContextId = i.ContextId),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeforeSkillWithTarget,
          t,
          s
        );
      h = r.SkillMode;
      if (1 === h) {
        if (
          ((this.KWo = e),
          CombatDebugController_1.CombatDebugController.CombatDebug(
            "Skill",
            this.Entity,
            "GASkill TryActivateAbilityByClass",
            ["技能Id", t],
            ["技能名", e.SkillName],
            ["GaClass", e.AbilityClass?.GetName()]
          ),
          !this.XXr.TryActivateAbilityByClass(e.AbilityClass, !0))
        )
          return (
            CombatDebugController_1.CombatDebugController.CombatError(
              "Skill",
              this.Entity,
              "执行GA失败!:",
              ["技能Id:", e.SkillId],
              ["技能名", e.SkillName],
              ["GaClass:", e.AbilityClass?.GetName()]
            ),
            (this.KWo = void 0),
            (this.SkillTarget = void 0),
            (this.SkillTargetSocket = ""),
            !1
          );
      } else
        0 === h &&
          (this.DKo(e),
          e.HasMontages
            ? (CombatDebugController_1.CombatDebugController.CombatDebug(
                "Skill",
                this.Entity,
                "SimpleSkill PlaySkillMontage",
                ["技能Id", e.SkillId],
                ["技能名", e.SkillName]
              ),
              this.PlaySkillMontage(!1, 0, "", 0, () => {
                CombatDebugController_1.CombatDebugController.CombatDebug(
                  "Skill",
                  this.Entity,
                  "PlaySkillMontage onCompleted",
                  ["技能Id", e.SkillId],
                  ["技能名", e.SkillName]
                ),
                  this.DoSkillEnd(e);
              }))
            : (CombatDebugController_1.CombatDebugController.CombatInfo(
                "Skill",
                this.Entity,
                "SimpleSkill No Montage",
                ["技能Id", e.SkillId],
                ["技能名", e.SkillName]
              ),
              this.DoSkillEnd(e)));
      r.AutonomouslyBySimulate &&
        this.fte.SetMoveControlled(!0, r.MoveControllerTime, "特殊技能");
      (i = this.Entity.Id),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharUseSkill,
          i,
          e.SkillId,
          s
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharUseSkill,
          i,
          e.SkillId,
          s
        ),
        (t =
          ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
            this.Entity.Id
          ));
      return (
        t &&
          (t.IsLocal() &&
            EventSystem_1.EventSystem.EmitWithTarget(
              FormationEvent_1.Formation.Local,
              EventDefine_1.EEventName.CharUseSkill,
              i,
              e.SkillId,
              s
            ),
          EventSystem_1.EventSystem.EmitWithTarget(
            FormationEvent_1.Formation.All,
            EventDefine_1.EEventName.CharUseSkill,
            i,
            e.SkillId,
            s
          )),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharRecordOperate,
          this.SkillTarget,
          e.SkillId,
          r.SkillGenre
        ),
        this.DXr?.TriggerEvents(2, this.DXr, {
          SkillId: Number(e.SkillId),
          SkillGenre: r.SkillGenre,
        }),
        !0
      );
    }
    RKo(t, i) {
      return (
        !this.fWo.IsDeathInternal ||
        (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            20,
            "[CBT2临时处理]角色处于死亡中，暂不接受远端通知释放技能。",
            ["skillId", t.SkillId],
            ["entity", this.Entity.toString()]
          ),
        !1)
      );
    }
    SimulatedBeginSkill(t, i, e = !1, s = 0, r = BigInt(0)) {
      var h = this.LoadedSkills.get(t);
      if (!h)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "远端释放不存在的技能",
            ["技能Id", t]
          ),
          !1
        );
      if (
        (h.Active &&
          h.IsSimulated &&
          CombatDebugController_1.CombatDebugController.CombatWarn(
            "Skill",
            this.Entity,
            "重复释放远端技能",
            ["技能Id", t]
          ),
        !this.RKo(h, e))
      )
        return !1;
      var o = h.SkillInfo,
        l = this.StateMachineComp?.StateMachineGroup?.IsCurrentTaskSkill(t);
      if (
        this.FightStateComp &&
        h.SkillInfo.GroupId === exports.SKILL_GROUP_MAIN &&
        !l
      ) {
        l = this.FightStateComp.TrySwitchSkillState(h.SkillInfo, !1);
        if (!l) return !1;
        h.FightStateHandle = l;
      } else h.FightStateHandle = 0;
      return (
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Skill",
          this.Entity,
          "执行远端技能",
          ["技能Id", t],
          ["技能名", h.SkillName],
          ["特殊技能", e],
          ["打断等级", o.InterruptLevel]
        ),
        e &&
          (this.CurrentSkill && this.EKo(this.CurrentSkill, "远端特殊技能"),
          this.fte.SetMoveControlled(!1, s, "远端特殊技能")),
        this.Entity.GetComponent(157).ExitHitState("远端释放技能"),
        this.UKo(o.GroupId, h),
        h.SimulatedBeginSkill(r),
        (this.IsMainSkillReadyEnd = !1),
        (this.SkillTarget =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(i)),
        !0
      );
    }
    SimulateEndSkill(t) {
      var i,
        e = this.LoadedSkills.get(t);
      e
        ? e.Active && e.IsSimulated
          ? (CombatDebugController_1.CombatDebugController.CombatInfo(
              "Skill",
              this.Entity,
              "结束远端技能",
              ["技能Id", t],
              ["技能名", e.SkillName]
            ),
            this.AKo(e.SkillInfo.GroupId, e),
            e.EndSkill(),
            (this.IsMainSkillReadyEnd = !1),
            e.SkillInfo.AutonomouslyBySimulate &&
              this.fte.ResetMoveControlled("模拟端结束特殊技能"),
            EventSystem_1.EventSystem.EmitWithTarget(
              this.Entity,
              EventDefine_1.EEventName.OnSkillEnd,
              this.Entity.Id,
              e.SkillId
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSkillEnd,
              this.Entity.Id,
              t
            ),
            (i =
              ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
                this.Entity.Id
              )) &&
              (i.IsLocal() &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  FormationEvent_1.Formation.Local,
                  EventDefine_1.EEventName.OnSkillEnd,
                  this.Entity.Id,
                  e.SkillId
                ),
              EventSystem_1.EventSystem.EmitWithTarget(
                FormationEvent_1.Formation.All,
                EventDefine_1.EEventName.OnSkillEnd,
                this.Entity.Id,
                e.SkillId
              )))
          : CombatDebugController_1.CombatDebugController.CombatWarn(
              "Skill",
              this.Entity,
              "结束远端技能失败，技能未激活或非模拟执行",
              ["技能Id", t],
              ["技能名", e.SkillName]
            )
        : CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "远端结束不存在的技能",
            ["技能Id", t]
          );
    }
    OnActivateAbility(t, i) {
      if (!this.KWo)
        return (
          CombatDebugController_1.CombatDebugController.CombatError(
            "Skill",
            this.Entity,
            "GA已启动，但没有找到对应技能",
            ["GA", t.GetName()]
          ),
          -1
        );
      CombatDebugController_1.CombatDebugController.CombatDebug(
        "Skill",
        this.Entity,
        "CharacterSkillComponent.OnActivateAbility",
        ["技能Id", this.KWo.SkillId],
        ["GA", t.GetName()]
      ),
        (this.KWo.ActiveAbility = t);
      var e = this.KWo.SkillId;
      return (
        t.IsA(UE.GA_Base_C.StaticClass()) &&
          (((t = t).当前技能数据 = this.KWo.SkillInfo),
          (t.当前技能数据名 = this.KWo.SkillId.toString()),
          (t.SkillId = e)),
        this.DKo(this.KWo),
        (this.KWo = void 0),
        e
      );
    }
    OnEndAbility(t, i) {
      for (const e of this.GetAllActivatedSkill())
        if (e.ActiveAbility === t) return void this.DoSkillEnd(e);
      CombatDebugController_1.CombatDebugController.CombatWarn(
        "Skill",
        this.Entity,
        "[CharacterSkillComponent.OnEndAbility]GA已结束，但没有找到对应技能",
        ["GA", t.GetName()]
      );
    }
    LKo(t, i, e) {
      t
        ? ((this.SkillTarget =
            t instanceof Entity_1.Entity
              ? ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t)
              : ActorUtils_1.ActorUtils.GetEntityByActor(t)),
          (this.SkillTargetSocket = i))
        : this.XWo?.Valid
        ? this.SelectTargetAndSetShow(e)
        : (this.loe?.Valid
            ? (this.SkillTarget =
                this.loe.AiController.AiHateList.GetCurrentTarget())
            : (this.SkillTarget = void 0),
          (this.SkillTargetSocket = ""));
    }
    SelectTargetAndSetShow(t) {
      this.XWo?.Valid &&
        (this.XWo.SelectSoftLockTarget(
          t.LockOnConfigId,
          t.SkillTargetDirection,
          t.SkillTargetPriority,
          t.InheritTarget,
          t.ShowTarget
        ),
        (this.SkillTarget = this.XWo.GetCurrentTarget()),
        (this.SkillTargetSocket = this.XWo.GetCurrentTargetSocketName()));
    }
    DKo(t) {
      if (!this.WWo.has(t.SkillId)) {
        this.WWo.add(t.SkillId),
          CombatDebugController_1.CombatDebugController.CombatDebug(
            "Skill",
            this.Entity,
            "CharacterSkillComponent.DoSkillBegin",
            ["技能Id", t.SkillId],
            ["技能名", t.SkillName]
          );
        var i = this.GetSkillInfo(t.SkillId),
          e =
            (t.BeginSkill(),
            this.UKo(i.GroupId, t),
            SkillMessageController_1.SkillMessageController.UseSkillRequest(
              this.Entity,
              t,
              this.SkillTarget?.Id ?? 0
            ),
            this.xKo(t),
            this.JWo?.StartCd(t.SkillId),
            0 < Math.abs(i.StrengthCost) &&
              FormationAttributeController_1.FormationAttributeController.AddValue(
                1,
                i.StrengthCost
              ),
            this.GetSkillLevelBySkillInfoId(t.SkillId));
        if (
          (i.GroupId === exports.SKILL_GROUP_MAIN &&
            (this.IsMainSkillReadyEnd = !1),
          t.BeginSkillBuffAndTag(e),
          this.vwe.ExitHitState("释放技能"),
          t.HasAnimTag || this.vwe.ExitAimStatus(),
          this.XWo?.Valid)
        )
          switch (i.SkillTarget.SkillTargetDirection) {
            case 0:
              this.SkillTarget?.Valid ? this.PKo() : this.wKo();
              break;
            case 1:
              this.wKo();
              break;
            case 3:
              this.BKo();
          }
        if (
          (i.WalkOffLedge && this.lce.SetWalkOffLedgeRecord(!1),
          exports.SKILL_GROUP_MAIN === i.GroupId)
        ) {
          this.lce &&
            6 === this.lce.CharacterMovement.MovementMode &&
            ((e = this.lce.CharacterMovement.CustomMovementMode) ===
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_GLIDE
              ? (i = this.Entity.GetComponent(49)).Valid && i.ExitGlideState()
              : e === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SOAR &&
                (i = this.Entity.GetComponent(49)).Valid &&
                i.ExitSoarState());
          var s,
            e = this.vwe.MoveState;
          switch (e) {
            case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
              this.eie.ContainsTagById(-1800191060) ||
                (this.eie.RemoveTagById((s = 388142570)),
                this.DXr.RemoveBuffByTag(s, `技能${t.SkillId}结束移动`),
                this.vwe.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Run
                ));
              break;
            case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
            case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
            case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
              this.vwe.SetMoveState(
                CharacterUnifiedStateTypes_1.ECharMoveState.Stand
              );
          }
        }
        (this.lce.CharacterMovement.OverrideTerminalVelocity = 99999),
          this.lce.SetFallingHorizontalMaxSpeed(99999),
          this.WWo.delete(t.SkillId);
      }
    }
    DoSkillEnd(t) {
      var i, e;
      this.WWo.has(t.SkillId) ||
        (this.WWo.add(t.SkillId),
        CombatDebugController_1.CombatDebugController.CombatInfo(
          "Skill",
          this.Entity,
          "CharacterSkillComponent.DoSkillEnd",
          ["技能Id", t.SkillId],
          ["技能名", t.SkillName]
        ),
        (i = t.SkillInfo),
        this.bKo(t),
        this.AKo(i.GroupId, t),
        t.EndSkill(),
        i.GroupId === exports.SKILL_GROUP_MAIN &&
          ((this.iKo = !1), (this.IsMainSkillReadyEnd = !0), (this.cKo = 0)),
        i.WalkOffLedge && this.lce.SetWalkOffLedgeRecord(!0),
        (this.lce.CharacterMovement.OverrideTerminalVelocity = 0),
        this.lce.ClearFallingHorizontalMaxSpeed(),
        this.DXr.HasBuffAuthority() &&
          this.DXr.RemoveBuff(CharacterBuffIds_1.buffId.GoDown, -1, "技能结束"),
        this.eie.ContainsTagById(interruptTag) &&
          this.eie.RemoveTagById(interruptTag),
        SkillMessageController_1.SkillMessageController.EndSkillRequest(
          this.Entity,
          t.SkillId
        ),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSkillEnd,
          this.Entity.Id,
          t.SkillId
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSkillEnd,
          this.Entity.Id,
          t.SkillId
        ),
        (e =
          ModelManager_1.ModelManager.FormationModel.GetFormationInsByEntityId(
            this.Entity.Id
          )) &&
          (e.IsLocal() &&
            EventSystem_1.EventSystem.EmitWithTarget(
              FormationEvent_1.Formation.Local,
              EventDefine_1.EEventName.OnSkillEnd,
              this.Entity.Id,
              t.SkillId
            ),
          EventSystem_1.EventSystem.EmitWithTarget(
            FormationEvent_1.Formation.All,
            EventDefine_1.EEventName.OnSkillEnd,
            this.Entity.Id,
            t.SkillId
          )),
        this.DXr?.TriggerEvents(3, this.DXr, {
          SkillId: Number(t.SkillId),
          SkillGenre: i.SkillGenre,
        }),
        this.WWo.delete(t.SkillId));
    }
    PlaySkillMontage2Server(t, i, e, s, r) {
      t = this.LoadedSkills.get(t);
      t &&
        (ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
          t.MontageContextId
        ),
        (t.MontageContextId =
          ModelManager_1.ModelManager.CombatMessageModel.CreateMontageContext(
            t.SkillId,
            i
          )),
        SkillMessageController_1.SkillMessageController.MontageRequest(
          this.Entity,
          1,
          t.SkillId?.toString(),
          this.SkillTarget?.Id ?? 0,
          i,
          e,
          s,
          r,
          t.CombatMessageId,
          t.MontageContextId
        ));
    }
    EndSkillMontage(t, i) {
      var e,
        s = this.LoadedSkills.get(t);
      s &&
        (e = ModelManager_1.ModelManager.CombatMessageModel.GetCombatContext(
          s.MontageContextId
        )?.MontageContext) &&
        e.SkillId === t &&
        e.MontageIndex === i &&
        (ModelManager_1.ModelManager.CombatMessageModel.RemoveCombatContext(
          s.MontageContextId
        ),
        (s.MontageContextId = void 0));
    }
    SimulatePlayMontage(t, i, e) {
      t = this.LoadedSkills.get(t);
      t &&
        t.PlayMontage(
          e.MontageIndex ?? 0,
          e.SpeedRatio ?? 1,
          e.StartSection ?? "",
          e.StartTimeSeconds ?? 0
        );
    }
    RollingGrounded() {
      var t = this.Entity.GetComponent(33);
      t.Valid &&
        ((t.IsMainSkillReadyEnd = !1),
        (this.tKo = TimerSystem_1.TimerSystem.Delay(
          this.eKo,
          ROLLING_GROUNDED_RECOVER_TIME
        ))),
        this.vwe.PositionState ===
          CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.vwe.SetMoveState(
            CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll
          );
    }
    IsSkillInCd(t) {
      return !!this.JWo && this.JWo.IsSkillInCd(t);
    }
    GetCurrentMontageCorrespondingSkillId() {
      var t,
        i,
        e = this.XXr?.GetCurrentWaitAndPlayedMontageCorrespondingGa();
      for ([t, i] of this.LoadedSkills)
        if (i.Active && i.ActiveAbility === e) return t;
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 23, "不存在该GA的技能", [
            "玩家id",
            this.Entity.Id,
          ]),
        0
      );
    }
    get SkillAcceptInput() {
      return this.iKo;
    }
    SetSkillAcceptInput(t) {
      (this.iKo = t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SkillAcceptChanged,
          this.CurrentSkill?.SkillId ?? 0,
          this.iKo
        );
    }
    lCn() {
      var t = this.CurrentSkill;
      t &&
        (t.SkillInfo.SkillTarget.TargetDied
          ? (this.XWo?.Valid &&
              this.SelectTargetAndSetShow(t.SkillInfo.SkillTarget),
            this.loe?.Valid &&
              (t = this.loe.AiController.AiHateList.GetCurrentTarget()) &&
              t.Id !== this.SkillTarget?.Id &&
              (this.SkillTarget =
                ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
                  t.Entity
                )))
          : ((this.SkillTarget = void 0), (this.SkillTargetSocket = "")));
    }
    GetTargetTransform() {
      var i = this.SkillTarget.Entity.GetComponent(0).GetEntityType();
      if (
        i !== Protocol_1.Aki.Protocol.EEntityType.Player &&
        i !== Protocol_1.Aki.Protocol.EEntityType.Npc &&
        i !== Protocol_1.Aki.Protocol.EEntityType.Monster &&
        i !== Protocol_1.Aki.Protocol.EEntityType.Vision
      )
        return this.SkillTarget.Entity.GetComponent(1).ActorTransform;
      {
        let t = this.SkillTargetSocket;
        t = t || HIT_CASE_SOCKET_NAME;
        var i = this.SkillTarget.Entity.GetComponent(3),
          e = i.Actor.Mesh,
          s = FNameUtil_1.FNameUtil.GetDynamicFName(t);
        return e?.DoesSocketExist(s)
          ? e.GetSocketTransform(s, 0)
          : i.ActorTransform;
      }
    }
    GetTargetDistance() {
      var t;
      return this.SkillTarget && (t = this.GetTargetTransform())
        ? (this.pz.FromUeVector(t.GetLocation()),
          Vector_1.Vector.Dist(this.fte.ActorLocationProxy, this.pz))
        : -1;
    }
    SetSkillCanRotate(t) {
      (this.oKo = t) || this.nKo.Reset();
    }
    SetSkillRotateSpeed(t) {
      this.sKo = t;
    }
    SetRotateTarget(t, i) {
      (this.aKo.Target = t), (this.aKo.Type = i);
    }
    SetSkillRotateToTarget(t, i, e, s = 0, r = 0) {
      (this.hKo = t),
        (this.nKo.IsUseAnsRotateOffset = i),
        (this.nKo.AnsRotateOffset.Yaw = -MathUtils_1.MathUtils.Clamp(
          e,
          -MathUtils_1.PI_DEG,
          MathUtils_1.PI_DEG
        )),
        (this.nKo.PauseRotateThreshold = s),
        (this.nKo.ResumeRotateThreshold = r);
    }
    SetIgnoreSocketName(t) {
      this.IgnoreSocketName.add(t.toString());
    }
    DeleteIgnoreSocketName(t) {
      this.IgnoreSocketName.delete(t.toString());
    }
    wKo() {
      this.fte.IsAutonomousProxy &&
        this.IsHasInputDir() &&
        (this._ue.FromUeRotator(this.qKo()),
        this.L_e.Set(
          this.fte.ActorLocationProxy,
          this._ue.Quaternion(),
          this.fte.ActorScaleProxy
        ),
        this.CDe?.Valid
          ? this.CDe.SetTransformWithModelBuffer(
              this.L_e.ToUeTransform(),
              SKILL_TURN_TIME,
              1
            )
          : this.fte.SetActorTransform(
              this.L_e.ToUeTransform(),
              "释放技能.转向输入方向",
              !1,
              1
            ));
    }
    IsHasInputDir() {
      var t;
      return (
        !!this.CheckIsLoaded() &&
        ((t = this.fte.InputDirectProxy),
        0 < Math.abs(t.X) || 0 < Math.abs(t.Y))
      );
    }
    BKo() {
      this._ue.FromUeRotator(
        Global_1.Global.CharacterCameraManager.GetCameraRotation()
      ),
        this._ue.Vector(this.pz),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.pz,
          Vector_1.Vector.UpVectorProxy,
          this._ue
        ),
        this.L_e.Set(
          this.fte.ActorLocationProxy,
          this._ue.Quaternion(),
          this.fte.ActorScaleProxy
        ),
        this.CDe?.Valid
          ? this.CDe.SetTransformWithModelBuffer(
              this.L_e.ToUeTransform(),
              SKILL_TURN_TIME,
              1
            )
          : this.fte.SetActorTransform(
              this.L_e.ToUeTransform(),
              "释放技能.转向摄像机方向",
              !1,
              1
            );
    }
    PKo() {
      this.SkillTarget &&
        (this.pz.FromUeVector(this.GetTargetTransform().GetLocation()),
        this.pz.SubtractionEqual(this.fte.ActorLocationProxy),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          this.pz,
          Vector_1.Vector.UpVectorProxy,
          this._ue
        ),
        this.CDe?.Valid
          ? (this.L_e.Set(
              this.fte.ActorLocationProxy,
              this._ue.Quaternion(),
              this.fte.ActorScaleProxy
            ),
            this.CDe.SetTransformWithModelBuffer(
              this.L_e.ToUeTransform(),
              SKILL_TURN_TIME,
              1
            ))
          : this.fte.SetActorRotation(
              this._ue.ToUeRotator(),
              "释放技能.转向技能目标",
              !1
            ));
    }
    qKo() {
      return this.fte.InputRotator;
    }
    UpdateAllSkillRotator(t) {
      if (!this.CheckIsLoaded() || !this.lce) return !1;
      if (this.eie.ContainsTagById(504239013)) return !1;
      if (!this.oKo) return !1;
      var i = Math.abs(this.sKo);
      if (this.hKo) {
        var e = this.GKo();
        if (!e) return !1;
        MathUtils_1.MathUtils.LookRotationUpFirst(
          e,
          Vector_1.Vector.UpVectorProxy,
          this._ue
        ),
          this.lce.SmoothCharacterRotation(
            this._ue,
            i,
            t,
            !1,
            "Skill.UpdateAllSkillRotator"
          );
      } else
        this.lce.SmoothCharacterRotation(
          this.qKo(),
          i,
          t,
          !1,
          "Skill.UpdateAllSkillRotator"
        );
      return !0;
    }
    GKo() {
      var i = this.fte.ActorLocationProxy;
      switch (this.aKo.Type) {
        case 0:
          return this.SkillTarget
            ? ((e = this.SkillTarget.Entity.CheckGetComponent(1)),
              this.NKo(e, i))
            : void 0;
        case 1:
          var e = this.aKo.Target;
          return this.pLo.DeepCopy(e), this.pLo.SubtractionEqual(i), this.pLo;
        case 2:
          var e = this.aKo.Target;
          return this.pLo.DeepCopy(e), this.pLo;
        case 3:
        case 6: {
          let t = void 0;
          return (t =
            3 === this.aKo.Type
              ? BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                  this.Entity.Id,
                  this.aKo.Target
                )
              : BlackboardController_1.BlackboardController.GetIntValueByEntity(
                  this.Entity.Id,
                  this.aKo.Target
                ))
            ? ((e = EntitySystem_1.EntitySystem.Get(t).CheckGetComponent(1)),
              this.pLo.DeepCopy(e.ActorLocationProxy),
              this.pLo.SubtractionEqual(i),
              this.pLo)
            : void 0;
        }
        case 4:
          e =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              this.Entity.Id,
              this.aKo.Target
            );
          return e
            ? (this.pLo.DeepCopy(e), this.pLo.SubtractionEqual(i), this.pLo)
            : void 0;
        case 5:
          e =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              this.Entity.Id,
              this.aKo.Target
            );
          return e ? (this.pLo.DeepCopy(e), this.pLo) : void 0;
        default:
          return;
      }
    }
    NKo(t, i) {
      var e = this.CurrentSkill;
      let s = void 0;
      (s = e ? this.GetTargetTransform() : s)
        ? this.pLo.FromUeVector(s.GetLocation())
        : this.pLo.DeepCopy(t.ActorLocationProxy),
        this.pLo.SubtractionEqual(i),
        this.pLo.Normalize(),
        this.nKo.IsUseAnsRotateOffset &&
          0 !== this.nKo.AnsRotateOffset.Yaw &&
          ((this.pLo.Z = 0),
          this.nKo.AnsRotateOffset.Quaternion().RotateVector(
            this.pLo,
            this.pLo
          ));
      (e = this.fte.ActorForwardProxy),
        (t = Math.abs(MathUtils_1.MathUtils.GetAngleByVectorDot(this.pLo, e)));
      return (
        this.nKo.IsPaused
          ? 0 < this.nKo.ResumeRotateThreshold &&
            (t < this.nKo.ResumeRotateThreshold
              ? this.pLo.DeepCopy(e)
              : (this.nKo.IsPaused = !1))
          : 0 < this.nKo.PauseRotateThreshold &&
            t < this.nKo.PauseRotateThreshold &&
            ((this.nKo.IsPaused = !0), this.pLo.DeepCopy(e)),
        this.pLo
      );
    }
    GetPointTransform(t) {
      var i;
      return this.CheckIsLoaded() &&
        (i = this.fte.Actor.Mesh)?.DoesSocketExist(t)
        ? i.GetSocketTransform(t, 0)
        : void 0;
    }
    GetSkillByName(t) {
      return this.lKo.get(t);
    }
    get SkillElevationAngle() {
      return this._Ko;
    }
    SetSkillElevationAngle(t) {
      this._Ko = t;
    }
    get LastActivateSkillTime() {
      return this.uKo;
    }
    SetLastActivateSkillTime(t) {
      this.uKo = t;
    }
    get CurrentPriority() {
      return this.cKo;
    }
    SetCurrentPriority(t) {
      this.cKo = t;
    }
    HasAbility(t) {
      return !!this.CheckIsLoaded() && this.LoadedSkills.has(t);
    }
    SetSkillPriority(t, i) {
      this.CheckIsLoaded() &&
        (t = this.LoadedSkills.get(t))?.Active &&
        t.SetSkillPriority(i);
    }
    CallAnimBreakPoint() {
      this.CheckIsLoaded() &&
        (this.eie.ContainsTagById(interruptTag) ||
          this.eie.AddTagById(interruptTag),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharAnimBreakPoint,
          this.Entity.Id
        ));
    }
    GetActivePriority(t) {
      return this.CheckIsLoaded() && (t = this.LoadedSkills.get(t))?.Active
        ? t.SkillInfo.InterruptLevel
        : -1;
    }
    GetSkillMontageInstance(t, i) {
      if (this.CheckIsLoaded()) {
        t = this.LoadedSkills.get(t);
        if (t) return t.GetMontageByIndex(i);
      }
    }
    IsCanUseSkill(t) {
      var i;
    //   return (
    //     !!this.CheckIsLoaded() &&
    //     !(
    //       !(i = this.GetSkillInfo(t)) ||
    //       this.IsSkillInCd(t) ||
    //       !this.IKo(i.GroupId, i.InterruptLevel, []) ||
    //       this.IsSkillGenreForbidden(i)
    //     )
    //   );
    return 1;
    }
    ResetRoleGrowComponent(t) {
      this.YWo || (this.YWo = t);
    }
    GetSkillLevelBySkillInfoId(t) {
      return this.YWo
        ? this.YWo.GetSkillLevelBySkillInfoId(t)
        : CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
    }
    GetSkillIdWithGroupId(t) {
      return this.jWo.get(t)?.[SKILL_GROUP_INDEX]?.SkillId ?? 0;
    }
    xKo(t) {
      var i = { Entity: this.Entity, SkillComponent: this, Skill: t },
        e = this.GetSkillInfo(t.SkillId);
      for (let t = 0; t < e.SkillBehaviorGroup.Num(); t++) {
        var s = e.SkillBehaviorGroup.Get(t);
        if (
          SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(
            s.SkillBehaviorConditionGroup,
            i
          )
        ) {
          SkillBehaviorAction_1.SkillBehaviorAction.Begin(
            s.SkillBehaviorActionGroup,
            i
          );
          break;
        }
      }
    }
    bKo(t) {
      SkillBehaviorAction_1.SkillBehaviorAction.End(t);
    }
    UKo(t, i) {
      let e = this.jWo.get(t);
      e || ((e = []), this.jWo.set(t, e)), e.includes(i) || e.push(i);
    }
    AKo(t, i) {
      t = this.jWo.get(t);
      t && -1 !== (i = t.indexOf(i)) && t.splice(i, 1);
    }
    *GetAllActivatedSkill() {
      for (const t of this.jWo.values()) for (const i of t.values()) yield i;
    }
  });
(CharacterSkillComponent.mKo = !1),
  (CharacterSkillComponent.dKo = 0),
  (CharacterSkillComponent.CKo = 0),
  (CharacterSkillComponent = CharacterSkillComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(33)],
      CharacterSkillComponent
    )),
  (exports.CharacterSkillComponent = CharacterSkillComponent);
//# sourceMappingURL=CharacterSkillComponent.js.map
